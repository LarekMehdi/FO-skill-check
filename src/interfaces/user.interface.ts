import type { Role } from "../constants/role.constant";
import type { UserTestSessionInterface } from "./testSession.interface";


export interface SmallUserInterface {
    id: number;
    pseudo: string;
}
export interface UserInterface extends SmallUserInterface {
    email: string;
    role: Role;
}

export interface UserDetailsInterface extends UserInterface{
    sessionList: UserTestSessionInterface[];
}