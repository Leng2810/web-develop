import { deletePostByAdmin, getPostByIdAdmin } from "@controllers/api/admin/postController";
import { checkRole } from "@middlewares/role";
import { Router } from "express";

const router = Router();

router.get("/", checkRole("admin"), getPostByIdAdmin);
router.delete("./:id", checkRole("admin"), deletePostByAdmin);

export default router;
