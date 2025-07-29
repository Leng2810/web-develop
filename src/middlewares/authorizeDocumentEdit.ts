import { Response, NextFunction } from "express";
import { findDocumentById } from "@services/documentService";
import { AppRequest } from "appRequest";

export const authorizeDocumentEdit = async (
  req: AppRequest,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const role = req.user?.role;

  const document = await findDocumentById(id);
  if (!document) {
    return res.status(404).json({ message: "Không tìm thấy tài liệu" });
  }

  if (document.uploaderId !== userId && role !== "admin") {
    return res
      .status(403)
      .json({ message: "Bạn không có quyền chỉnh sửa tài liệu" });
  }

  req.document = document;
  next();
};
