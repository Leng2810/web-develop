import { Router } from "express";
import { uploadDocument } from "@controllers/api/document/uploadDocument";
import { getDocuments } from "@controllers/api/document/getDocuments";
import { verifyToken } from "@middlewares/auth";

const router = Router();

router.get("/", verifyToken, getDocuments);
router.post("/upload", verifyToken, uploadDocument);

export default router;
