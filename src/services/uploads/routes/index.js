import { Router } from "express";
import authenticateToken from "../../../middlewares/authentication.js";
import { uploadImages } from '../controller/upload-controller.js';
import { upload } from '../storage/storage-config.js';

const router = Router();

router.post('/images', authenticateToken, upload.single('image'), uploadImages);

export default router;