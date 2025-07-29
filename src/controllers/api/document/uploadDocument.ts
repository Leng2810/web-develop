import { Response } from "express";
import sequelize from "@initializers/sequelize";
import { AppRequest } from "appRequest";

const Document = sequelize.models.Document;

export const uploadDocument = async (req: AppRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: "Thiếu title hoặc content" });
    }

    const uploaderId = req.user?.id;

    const document = await Document.create({
      title,
      content,
      uploaderId,
    });

    res.status(201).json({ message: `Upload thành công`, document });
  } catch (error) {
    res.status(500).json({ message: `Lỗi khi upload`, error });
  }
};
