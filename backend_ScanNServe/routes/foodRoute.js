import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import adminAuth from "../middleware/adminAuth.js"

const foodRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder and rename it)
/*
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})
*/

// Use memoryStorage instead of diskStorage
const storage = multer.memoryStorage();

const upload = multer({ storage: storage})

// Admin-only routes
foodRouter.post("/add", adminAuth, upload.single("image"), addFood);
foodRouter.post("/remove", adminAuth, removeFood);

// Public route (customers can view menu)
foodRouter.get("/list", listFood);

export default foodRouter;