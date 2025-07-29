import { Response } from "express";
import sequelize from "@initializers/sequelize";
import { AppRequest } from "appRequest";
import { DocumentInstance } from "Document";

const Document = sequelize.models.Document;

export const updatedDocument = async (req: AppRequest, res: Response) => {
  try {
    const documentId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user?.id;
    const role = req.user?.role;

    const document = (await Document.findByPk(documentId)) as DocumentInstance;

    if (!document) {
      return res.status(404).json({ message: `Không tìm thấy tài liệu ` });
    }

    if (document.uploaderId !== userId && role !== "admin") {
      return res
        .status(403)
        .json({ message: `Không tìm thấy quyền sửa từ người dùng ` });
    }

    await document.update({ title, content });
    res.status(200).json({ message: `Cập nhật thành công ` });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi khi cập nhật dữ liệu` });
  }
};
