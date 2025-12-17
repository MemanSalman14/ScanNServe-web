import express from "express";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import { listOrders, placeDineInOrder, placeOnlineOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

// Customer routes (use regular auth)
orderRouter.post("/place-dinein", authMiddleware, placeDineInOrder);
orderRouter.post("/place-online", authMiddleware, placeOnlineOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);

// Admin routes (use admin auth)
orderRouter.get("/list", adminAuth, listOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;