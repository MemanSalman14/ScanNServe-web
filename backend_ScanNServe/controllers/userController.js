import userModel from "../models/userModel.js";

// Get or create user by Clerk ID (Helper function)
const getUserByClerkId = async (clerkId) => {
    try {
        let user = await userModel.findOne({ clerkId });
        
        if (!user) {
            console.log("User not found in database, creating placeholder:", clerkId);
            user = new userModel({
                clerkId,
                email: `user_${clerkId}@temp.com`,
                name: 'User',
                profilePicture: '',
                cartData: {}
            });
            await user.save();
        }
        
        return user;
    } catch (error) {
        console.error("Error getting user by Clerk ID:", error);
        return null;
    }
}

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await getUserByClerkId(req.body.userId);
        
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ 
            success: true, 
            data: {
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        console.error("Error getting user profile:", error);
        res.json({ success: false, message: "Error fetching profile" });
    }
}

export { getUserByClerkId, getUserProfile };