import type { Role } from "../constants/role.constant";

export interface UserInterface {
    id: number;
    pseudo: string;
    email?: string;
    role: Role;
}