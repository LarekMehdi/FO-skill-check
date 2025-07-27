import type { Role } from "../constants/role.constante";

export interface UserInterface {
    id: number;
    pseudo: string;
    email?: string;
    role: Role;
}