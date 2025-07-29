import { Router } from "express";
import { register, login } from "@controllers/api/user/authController";
import postRouter from "./post";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.use("/post", postRouter);

export default router;
