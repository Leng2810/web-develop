import sequelize from "@initializers/sequelize";
import { DocumentInstance } from "Document";

const Document = sequelize.models.Document;

export const updatedDocumentById = async (
  documentId: string,
  title: string,
  content: string,
): Promise<DocumentInstance | null> => {
  const document = (await Document.findByPk(documentId)) as DocumentInstance;
  if (!document) return null;

  await document.update({ title, content });
  return document;
};

export const findDocumentById = async (
  documentId: string,
): Promise<DocumentInstance | null> => {
  return (await Document.findByPk(documentId)) as DocumentInstance;
};
