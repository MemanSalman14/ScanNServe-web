import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    orderNumber: { type: String, required: true, unique: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    tableNumber: { type: String, required: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    specialInstructions: { type: String, default: "" },
    status: { 
        type: String, 
        default: "Order Received",
        enum: ["Order Received", "Preparing", "Ready to Serve", "Served", "Completed", "Cancelled"]
    },
    orderType: { type: String, default: "Dine-In" },
    paymentMethod: { 
        type: String, 
        default: "PayAtCounter",
        enum: ["PayAtCounter", "PayNow"]
    },
    payment: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
}, { timestamps: true })

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;