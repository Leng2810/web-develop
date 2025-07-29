import { Request, Response, NextFunction } from "express";

interface AppRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export const checkRole = (requiredRole: string) => {
  return (req: AppRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user?.role) {
      return res
        .status(403)
        .json({ message: "Không xác định được vai trò người dùng" });
    }

    if (user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: `Cần quyền ${requiredRole} để truy cập` });
    }

    next();
  };
};
