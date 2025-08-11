import { UserApi } from "../api/UserApi";

export abstract class UserService {

    /** FIND **/

    static async findDetails(id: number) {
        return await UserApi.findDetails(id);
    }
}