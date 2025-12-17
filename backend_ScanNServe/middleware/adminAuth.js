import { clerkClient } from '@clerk/clerk-sdk-node'

const adminAuth = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized - No token provided" 
            })
        }

        const token = authHeader.split(' ')[1]

        // Verify token with Clerk
        try {
            const session = await clerkClient.sessions.verifyToken(token, {
                secretKey: process.env.CLERK_ADMIN_SECRET_KEY
            })
            
            if (!session) {
                return res.status(401).json({ 
                    success: false, 
                    message: "Unauthorized - Invalid token" 
                })
            }

            // Get user details
            const user = await clerkClient.users.getUser(session.sub)
            
            // Check if user has admin role
            if (user.publicMetadata?.role !== 'admin') {
                return res.status(403).json({ 
                    success: false, 
                    message: "Forbidden - Admin access required" 
                })
            }

            req.userId = session.sub
            req.user = user
            next()

        } catch (error) {
            console.error("Token verification error:", error)
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized - Token verification failed" 
            })
        }

    } catch (error) {
        console.error("Admin auth error:", error)
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        })
    }
}

export default adminAuth