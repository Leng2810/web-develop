import { Router } from "express";
import { getAllDocuments } from "@controllers/api/document/getAllDocument";
import { verifyToken } from "@middlewares/auth";
import { checkRole } from "@middlewares/role";
import postRouter from "./post";
const router = Router();

router.get("/document", verifyToken, checkRole("admin"), getAllDocuments);
router.use("/posts", postRouter);

export default router;
