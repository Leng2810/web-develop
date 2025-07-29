import { Response } from "express";
import sequelize from "@initializers/sequelize";
import { AppRequest } from "appRequest";

const Document = sequelize.models.Document;
const User = sequelize.models.User;

export const getAllDocuments = async (req: AppRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const document = await Document.findAll({
      where: { uploaderId: userId },
      include: [
        {
          model: User,
          attributes: ["id", "email", "fullName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ document });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách tài liệu", error });
  }
};
