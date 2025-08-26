import { UserApi } from "../api/UserApi";
import type { GenericFilter } from "../interfaces/filter.interface";
import type { UserInterface } from "../interfaces/user.interface";

export abstract class UserService {

    /** FIND **/

    static async findDetails(id: number) {
        return await UserApi.findDetails(id);
    }

    /** FIND ALL **/

    static async findAll(filter: GenericFilter) {
        return await UserApi.findAll(filter);
    }

    /** UPDATE **/

    static async changeUserRole(dto: Pick<UserInterface, 'id' | 'role'>) {
        return await UserApi.changeUserRole(dto);
    }

    static async updateProfil(dto: Pick<UserInterface, 'id' | 'pseudo' | 'email'>) {
        return await UserApi.updateProfil(dto);
    }
}