import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import sequelize from "@initializers/sequelize";
import jwt from "jsonwebtoken";

const User = sequelize.models.User;

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email đã tồn tại" });
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      passwordHash: hash,
    });

    const token = jwt.sign(
      {
        id: user.getDataValue("id"),
        email: user.getDataValue("email"),
        role: user.getDataValue("role"),
      },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" },
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Đăng kí thất bại", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: `Email không tồn tại` });

    const isMatch = await bcrypt.compare(
      password,
      user.getDataValue("passwordHash"),
    );
    if (!isMatch) { return res.status(401).json({ message: `Mật khẩu không đúng` }); }

    const token = jwt.sign(
      {
        id: user.getDataValue("id"),
        email: user.getDataValue("email"),
        role: user.getDataValue("role"),
      },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" },
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Đăng nhập thất bại " });
  }
};
