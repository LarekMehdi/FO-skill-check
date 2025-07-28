import type { UserInterface } from "./user.interface";

export interface SigninDataInterface {
    pseudo: string;
    password: string;
}

export interface SignupDataInterface {
    pseudo: string;
    password: string;
    email: string;
}

export interface AuthDataInterface {
    accessToken: string;
    refreshToken?: string;
    user: UserInterface;
}