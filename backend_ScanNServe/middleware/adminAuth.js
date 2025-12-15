import { Webhook } from 'svix'
import { clerkClient } from '@clerk/clerk-sdk-node'

const adminAuth = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Unauthorized - No token" })
        }

        const token = authHeader.split(' ')[1]

        // Verify token with Clerk
        const session = await clerkClient.sessions.verifySession(token)
        
        if (!session) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" })
        }

        // Optional: Check if user is admin (you can add metadata in Clerk)
        const user = await clerkClient.users.getUser(session.userId)
        
        // Check if user has admin role (set this in Clerk dashboard metadata)
        if (user.publicMetadata?.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Forbidden - Admin access required" })
        }

        req.userId = session.userId
        next()

    } catch (error) {
        console.error("Admin auth error:", error)
        res.status(401).json({ success: false, message: "Unauthorized" })
    }
}

export default adminAuth