import sequelize from "@initializers/sequelize";
import { NextFunction, Request, Response } from "express";
import { PostAttributes } from "PostAttributes";
import { User } from "User";

const postModels = sequelize.models.Post;

export const isPostOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await postModels.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    const postData = post.get() as PostAttributes;
    const currentUserId = Number((req.user as User).id);
    if (postData.userId !== currentUserId) {
      return res.status(403).json({ message: "Bạn không có quyền với bài viết này" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
