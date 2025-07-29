import { Request, Response } from "express";
import sequelize from "@initializers/sequelize";

const postModels = sequelize.models.Post;

export const createPost = async (req: Request, res: Response) => {
  try {
    const newPost = await postModels.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: `Không thể tạo bài viết` });
  }
};
export const getAllPosts = async (_:Request, res: Response) => {
  try {
    const posts = await postModels.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy danh sách bài viết " });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await postModels.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Bài viết không tồn tại" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Lỗi truy xuất bài viết" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await postModels.findByPk(id);
    if (!updated) return res.status(404).json({ message: "Không tìm thấy bài viết" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật bài viết" });
  }
};

export const softDeletePost = async (req: Request, res: Response) => {
  try {
    const post = await postModels.destroy({ where: { id: req.params.id } });
    if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });
    return res.status(200).json({ message: "Đã xóa bài viết" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa bài viết" });
  }
};
