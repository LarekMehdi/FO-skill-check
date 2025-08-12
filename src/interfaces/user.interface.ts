import type { Role } from "../constants/role.constant";
import type { UserTestSessionInterface } from "./testSession.interface";

export interface UserInterface {
    id: number;
    pseudo: string;
    email?: string;
    role: Role;
}

export interface UserDetailsInterface extends UserInterface{
    sessionList: UserTestSessionInterface[];
}