import { clerkClient } from '@clerk/clerk-sdk-node';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the Clerk session token
        const sessionClaims = await clerkClient.verifyToken(token);
        
        if (!sessionClaims || !sessionClaims.sub) {
            return res.json({ success: false, message: "Invalid token" });
        }

        // Store Clerk user ID in request
        req.body.userId = sessionClaims.sub;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.json({ success: false, message: "Error verifying token" });
    }
}

export default authMiddleware;