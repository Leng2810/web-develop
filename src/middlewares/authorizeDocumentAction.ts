import { canPerformAction } from "@policies/documentPolicy";
import { findDocumentById } from "@services/documentService";
import { NextFunction, Response } from "express";
import { AppRequest } from "appRequest";
import { User } from "User";

export const authorDocumentUpdate = async (req: AppRequest, res: Response, next: NextFunction) => {
  const document = await findDocumentById(req.params.id);
  if (!document) return res.status(404).json({ message: `Không tìm thấy tài liệu` });

  if (!canPerformAction(req.user as User, "update", document)) {
    return res.status(403).json({ message: `Bạn không có quyền chỉnh sửa tài liệu này` });
  }

  req.document = document;
  next();
};
