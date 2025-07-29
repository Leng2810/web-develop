import { createPost, getAllPosts, getPostById, softDeletePost, updatePost } from "@controllers/api/user/postController";
import { isPostOwner } from "@middlewares/isPostOwner";
import { checkRole } from "@middlewares/role";
import { Router } from "express";

const router = Router();

router.post("/", checkRole("user"), createPost);
router.get("/", checkRole("user"), getAllPosts);
router.get("/:id", checkRole("user"), getPostById);
router.put("/:id", checkRole("user"), isPostOwner, updatePost);
router.delete("/:id", checkRole("user"), isPostOwner, softDeletePost);

export default router;
