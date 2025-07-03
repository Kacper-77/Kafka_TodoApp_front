export interface Todo {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    completed: boolean;
    priority: "LOW" | "MEDIUM" | "HIGH";
}

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