import { useApi } from "./useApi";

export abstract class UserApi {

    /** FIND **/

    static async findDetails(id: number) {
        try {
            const { data } = await useApi().get(`/users/details/${id}`);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    /** FIND ALL **/

    static async findAll() {
        try {
            const { data } = await useApi().get(``);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }
}