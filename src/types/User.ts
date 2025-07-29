export type Role = "admin" | "editor" | "viewer" | "uploader";

export interface User {
    id: number;
    name?: string;
    email: string;
    role: Role;
}