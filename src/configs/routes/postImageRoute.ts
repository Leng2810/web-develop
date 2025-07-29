import { uploadPostImage } from "@controllers/postImageController";
import { withoutSavingUploader } from "@middlewares/uploaders";
import { Router } from "express";

const router = Router();

router.post("/u/posts/upload", withoutSavingUploader.single("image"), uploadPostImage);

export default router;
