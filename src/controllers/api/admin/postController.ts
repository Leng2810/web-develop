import sequelize from "@initializers/sequelize";
import { Request, Response } from "express";

const postModels = sequelize.models.Post;

export const getPostByIdAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  };
  try {
    const postDetail = await postModels.findByPk(id);
    if (!postDetail) return res.status(404).json({ message: "Không tìm thấy bài viết" });

    return res.status(200).json(postDetail);
  } catch (error) {
    console.error("Lỗi khi lấy bài viết", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

export const deletePostByAdmin = async (req: Request, res: Response) => {
  try {
    const post = await postModels.destroy({ where: { id: req.params.id } });
    if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });
    return res.status(200).json({ message: "Đã xóa bài viết" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa bài viết" });
  }
};
