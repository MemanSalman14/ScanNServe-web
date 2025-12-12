import { clerkClient } from '@clerk/clerk-sdk-node';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ 
            success: false, 
            message: "Not Authorized. Login Again" 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the Clerk session token
        const session = await clerkClient.sessions.verifyToken(token, {
            jwtKey: process.env.CLERK_SECRET_KEY
        });
        
        if (!session || !session.userId) {
            return res.json({ 
                success: false, 
                message: "Invalid or expired token" 
            });
        }

        // Attach userId to request body
        req.body.userId = session.userId;
        req.clerkUserId = session.userId;
        
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.json({ 
            success: false, 
            message: "Authentication failed" 
        });
    }
}

export default authMiddleware;