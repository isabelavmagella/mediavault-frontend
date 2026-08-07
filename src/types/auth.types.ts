export type LoginRequest = {
    email: string;
    password: string;
}

export type RegisterRequest = {
    nome: string;
    email: string;
    password: string;
    role: number;
}

export type User = {
    id: number;
    nome: string;
    email: string;
    role: "USER" | "ADMIN";
}

export type AuthResponse = {
    token: string;
    user: User;
}