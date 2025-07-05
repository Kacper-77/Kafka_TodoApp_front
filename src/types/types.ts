import type { ReactNode } from "react";

export interface Todo {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    completed: boolean;
    priority: "LOW" | "MEDIUM" | "HIGH";
}

export type Priority = "LOW" | "MEDIUM" | "HIGH"

enum role {
    USER,
    ADMIN
}

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    age: number;
    role: role;
}

export interface ProtectedRouteProps {
    children: ReactNode
}

export interface AddTodoFormProps {
    onAdd: (todo: Todo) => void;
  }