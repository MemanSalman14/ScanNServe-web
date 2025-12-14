import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    tableNumber: { 
        type: String, 
        required: true, 
        unique: true 
    },
    qrCode: { 
        type: String, 
        required: true 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    currentOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        default: null
    }
}, { 
    timestamps: true 
});

const tableModel = mongoose.models.table || mongoose.model("table", tableSchema);

export default tableModel;