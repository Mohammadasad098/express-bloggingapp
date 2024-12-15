import express from "express";
import {addData , uploadImage } from "../controllers/data.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

router.post("/data", addData);
router.post("/uploadimage", upload.single("image"), uploadImage);


export default router;