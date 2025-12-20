import { clerkClient } from '@clerk/clerk-sdk-node'

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Unauthorized - No token provided" })
        }

        const token = authHeader.split(' ')[1]

        try {
            // Verify token with Clerk
            const decoded = await clerkClient.verifyToken(token)
            const userId = decoded.sub

            // Get user details from Clerk
            const user = await clerkClient.users.getUser(userId)
            
            // Check if user has admin role in public metadata
            const userRole = user.publicMetadata?.role

            if (userRole !== 'admin') {
                return res.status(403).json({ 
                    success: false, 
                    message: "Forbidden - Admin access required. Current role: " + (userRole || 'none')
                })
            }

            req.body.userId = userId
            req.adminUser = user
            next()

        } catch (error) {
            console.error("Token verification error:", error)
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" })
        }

    } catch (error) {
        console.error("Admin auth middleware error:", error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

export default adminAuth