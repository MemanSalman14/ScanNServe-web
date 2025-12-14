import tableModel from "../models/tableModel.js";
import QRCode from 'qrcode';

const frontend_url = "https://scan-n-serve-frontend.vercel.app";

// Generate QR code for a table
const generateTableQR = async (req, res) => {
    try {
        const { tableNumber } = req.body;

        if (!tableNumber) {
            return res.json({ success: false, message: "Table number is required" });
        }

        // Check if table already exists
        const existingTable = await tableModel.findOne({ tableNumber });
        if (existingTable) {
            return res.json({ 
                success: false, 
                message: "QR code already exists for this table",
                qrCode: existingTable.qrCode 
            });
        }

        // Generate QR code URL
        const tableUrl = `${frontend_url}?table=${tableNumber}`;
        
        // Generate QR code as data URL
        const qrCodeDataUrl = await QRCode.toDataURL(tableUrl, {
            width: 400,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });

        // Save to database
        const newTable = new tableModel({
            tableNumber,
            qrCode: qrCodeDataUrl,
            isActive: true
        });

        await newTable.save();

        res.json({ 
            success: true, 
            message: "QR code generated successfully",
            qrCode: qrCodeDataUrl,
            tableNumber: tableNumber
        });

    } catch (error) {
        console.error("Error generating QR code:", error);
        res.json({ success: false, message: "Error generating QR code" });
    }
}

// Get all tables
const getAllTables = async (req, res) => {
    try {
        const tables = await tableModel.find({}).sort({ tableNumber: 1 });
        res.json({ success: true, data: tables });
    } catch (error) {
        console.error("Error fetching tables:", error);
        res.json({ success: false, message: "Error fetching tables" });
    }
}

// Delete table QR code
const deleteTableQR = async (req, res) => {
    try {
        const { tableId } = req.body;
        await tableModel.findByIdAndDelete(tableId);
        res.json({ success: true, message: "Table QR code deleted" });
    } catch (error) {
        console.error("Error deleting table:", error);
        res.json({ success: false, message: "Error deleting table" });
    }
}

// Update table status
const updateTableStatus = async (req, res) => {
    try {
        const { tableId, isActive } = req.body;
        await tableModel.findByIdAndUpdate(tableId, { isActive });
        res.json({ success: true, message: "Table status updated" });
    } catch (error) {
        console.error("Error updating table status:", error);
        res.json({ success: false, message: "Error updating table status" });
    }
}

export { generateTableQR, getAllTables, deleteTableQR, updateTableStatus };