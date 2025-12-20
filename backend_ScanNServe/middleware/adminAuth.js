import { clerkClient } from '@clerk/clerk-sdk-node'

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("No authorization header found");
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized - No token provided" 
            })
        }

        const token = authHeader.split(' ')[1]

        if (!token) {
            console.log("Token is empty");
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized - Invalid token format" 
            })
        }

        try {
            // Verify JWT token
            const sessionClaims = await clerkClient.verifyToken(token, {
                secretKey: process.env.CLERK_SECRET_KEY
            })

            const userId = sessionClaims.sub

            // Get user details from Clerk
            const user = await clerkClient.users.getUser(userId)
            
            // Check if user has admin role in public metadata
            const userRole = user.publicMetadata?.role

            console.log(`User ${user.id} has role: ${userRole}`);

            if (userRole !== 'admin') {
                console.log("User is not admin");
                return res.status(403).json({ 
                    success: false, 
                    message: `Forbidden - Admin access required. Your role: ${userRole || 'none'}` 
                })
            }

            req.userId = userId
            req.adminUser = user
            next()

        } catch (verifyError) {
            console.error("Token verification error:", verifyError.message)
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized - Invalid token" 
            })
        }

    } catch (error) {
        console.error("Admin auth middleware error:", error)
        res.status(500).json({ 
            success: false, 
            message: "Server error in authentication" 
        })
    }
}

export default adminAuth