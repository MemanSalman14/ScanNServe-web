import { clerkClient } from '@clerk/clerk-sdk-node'

// Middleware for customer authentication
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Unauthorized - No token" })
        }

        const token = authHeader.split(' ')[1]

        try {
            // Verify token with Clerk
            const sessionClaims = await clerkClient.verifyToken(token)
            req.body.userId = sessionClaims.sub
            next()
        } catch (error) {
            console.error("Token verification error:", error)
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" })
        }

    } catch (error) {
        console.error("Auth middleware error:", error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

export default authMiddleware