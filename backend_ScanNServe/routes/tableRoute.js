import express from "express";
import { generateTableQR, getAllTables, deleteTableQR, updateTableStatus } from "../controllers/tableController.js";

const tableRouter = express.Router();

tableRouter.post("/generate", generateTableQR);
tableRouter.get("/list", getAllTables);
tableRouter.post("/delete", deleteTableQR);
tableRouter.post("/update-status", updateTableStatus);

export default tableRouter;