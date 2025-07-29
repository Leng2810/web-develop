import { User } from "User";
import { DocumentInstance } from "Document";

export const canPerformAction = (
  user: User,
  action: "view" | "update" | "delete" | "approve",
  document: DocumentInstance): boolean => {
  if (user.role === "admin") return true;

  if (action === "view") {
    return document.status === "approve" || document.uploaderId === user.id;
  };

  if (action === "update" || action === "delete") {
    return user.role === "editor" && document.uploaderId === user.id;
  };

  if (action === "approve") {
    return user.role === "viewer";
  }
};
