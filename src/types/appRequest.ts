import { Request } from "express";
import type { DocumentInstance } from "Document";

export interface AppRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
  document?: DocumentInstance;
}
