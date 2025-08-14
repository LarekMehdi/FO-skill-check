import { UserApi } from "../api/UserApi";
import type { GenericFilter } from "../interfaces/filter.interface";

export abstract class UserService {

    /** FIND **/

    static async findDetails(id: number) {
        return await UserApi.findDetails(id);
    }

    /** FIND ALL **/

    static async findAll(filter: GenericFilter) {
        return await UserApi.findAll(filter);
    }
}