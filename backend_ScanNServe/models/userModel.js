import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    profilePicture: { 
        type: String, 
        default: '' 
    },
    cartData: { 
        type: Object, 
        default: {} 
    }
}, { 
    minimize: false,
    timestamps: true 
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;