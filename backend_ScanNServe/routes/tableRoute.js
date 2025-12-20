import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { generateTableQR, getAllTables, deleteTableQR, updateTableStatus } from "../controllers/tableController.js";

const tableRouter = express.Router();

// Admin-only routes for table management
tableRouter.post("/generate", adminAuth, generateTableQR);
tableRouter.get("/list", adminAuth, getAllTables);
tableRouter.post("/delete", adminAuth, deleteTableQR);
tableRouter.post("/update-status", adminAuth, updateTableStatus);

export default tableRouter;