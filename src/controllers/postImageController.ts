import ImageUploaderService from "@services/imageUploader";
import { Request, Response } from "express";

export const uploadPostImage = async (req: Request, res: Response) => {
  try {
    const imageUrl = await ImageUploaderService.singleUpload(req.file);
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: "Lỗi đăng ảnh" });
  }
};
