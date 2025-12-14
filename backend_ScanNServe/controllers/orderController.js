import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import { getUserByClerkId } from "./userController.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Generate unique order number
const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD${timestamp}${random}`;
}

// Place Dine-In order (Pay at Counter)
const placeDineInOrder = async (req, res) => {
    try {
        const userData = await getUserByClerkId(req.body.userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const orderNumber = generateOrderNumber();
        
        const newOrder = new orderModel({
            userId: userData._id,
            orderNumber: orderNumber,
            items: req.body.items,
            amount: req.body.amount,
            tableNumber: req.body.tableNumber,
            customerName: req.body.customerName,
            phone: req.body.phone,
            specialInstructions: req.body.specialInstructions || "",
            orderType: "Dine-In",
            paymentMethod: "PayAtCounter",
            payment: false
        })
        
        await newOrder.save();
        await userModel.findByIdAndUpdate(userData._id, { cartData: {} });

        res.json({ 
            success: true, 
            message: "Order placed successfully",
            orderNumber: orderNumber,
            orderId: newOrder._id
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" })
    }
}

// Place online payment order (Stripe)
const placeOnlineOrder = async (req, res) => {
    const frontend_url = "https://scan-n-serve-frontend.vercel.app"

    try {
        const userData = await getUserByClerkId(req.body.userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const orderNumber = generateOrderNumber();
        
        const newOrder = new orderModel({
            userId: userData._id,
            orderNumber: orderNumber,
            items: req.body.items,
            amount: req.body.amount,
            tableNumber: req.body.tableNumber,
            customerName: req.body.customerName,
            phone: req.body.phone,
            specialInstructions: req.body.specialInstructions || "",
            orderType: "Dine-In",
            paymentMethod: "PayNow",
            payment: false
        })
        
        await newOrder.save();
        await userModel.findByIdAndUpdate(userData._id, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        // Add GST
        const gstAmount = Math.round(req.body.amount * 0.05);
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "GST (5%)"
                },
                unit_amount: gstAmount * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// user orders
const userOrders = async (req, res) => {
    try {
        const userData = await getUserByClerkId(req.body.userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        
        const orders = await orderModel.find({ userId: userData._id }).sort({ date: -1 });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Admin: List all orders
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Admin: Update order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { placeDineInOrder, placeOnlineOrder, verifyOrder, userOrders, listOrders, updateStatus }