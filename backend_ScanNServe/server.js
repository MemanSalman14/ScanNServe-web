import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import 'dotenv/config'
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import {inngest, functions} from "./inngest/index.js"
import { serve } from "inngest/express"


// app config
const app = express()
const port = process.env.PORT || 4000

app.use(express.json({ limit: '10mb' })) // Increase payload size limit
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://scan-n-serve-frontend.vercel.app',
    'https://scan-n-serve-admin.vercel.app'
  ],
  credentials: true
}))

// db connection
connectDB()

// middleware

{/*
app.use(express.json())
app.use(cors())
*/}





// api endpoints
app.get("/", (req, res) => {
    res.send("API Working")
  })
// Inngest endpoint for Clerk webhooks
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: functions,
  })
);
app.use("/api/food", foodRouter)
/*
app.use("/images",express.static('uploads'))
*/
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

