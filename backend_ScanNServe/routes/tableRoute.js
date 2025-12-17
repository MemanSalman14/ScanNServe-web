import express from "express";
import { generateTableQR, getAllTables, deleteTableQR, updateTableStatus } from "../controllers/tableController.js";
import adminAuth from "../middleware/adminAuth.js";

const tableRouter = express.Router();

// All table routes require admin authentication
tableRouter.post("/generate", adminAuth, generateTableQR);
tableRouter.get("/list", adminAuth, getAllTables);
tableRouter.post("/delete", adminAuth, deleteTableQR);
tableRouter.post("/update-status", adminAuth, updateTableStatus);

export default tableRouter;