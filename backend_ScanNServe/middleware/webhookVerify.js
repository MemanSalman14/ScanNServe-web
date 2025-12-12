import { Webhook } from 'svix';

export const verifyClerkWebhook = (req, res, next) => {
    try {
        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
        
        if (!WEBHOOK_SECRET) {
            throw new Error('CLERK_WEBHOOK_SECRET is not set');
        }

        // Get the headers
        const svix_id = req.headers['svix-id'];
        const svix_timestamp = req.headers['svix-timestamp'];
        const svix_signature = req.headers['svix-signature'];

        // If there are no headers, error out
        if (!svix_id || !svix_timestamp || !svix_signature) {
            return res.status(400).json({ 
                success: false, 
                message: 'Error occurred -- no svix headers' 
            });
        }

        // Get the body
        const payload = JSON.stringify(req.body);

        const wh = new Webhook(WEBHOOK_SECRET);
        
        // Verify the webhook
        wh.verify(payload, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        });

        next();
    } catch (error) {
        console.error('Error verifying webhook:', error);
        return res.status(400).json({ 
            success: false, 
            message: 'Webhook verification failed' 
        });
    }
};