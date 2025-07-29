import { Model } from "sequelize";

export interface DocumentAttributes {
  id: number;
  title: string;
  content: string;
  uploaderId: number;
  status: "draft" | "pending" | "approve";
}

export interface DocumentInstance
  extends Model<DocumentAttributes>,
    DocumentAttributes {}
