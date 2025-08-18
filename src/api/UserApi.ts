import type { GenericFilter } from "../interfaces/filter.interface";
import type { UserInterface } from "../interfaces/user.interface";
import { useApi } from "./useApi";

export abstract class UserApi {

    /** FIND **/

    static async findDetails(id: number) {
        try {
            const { data } = await useApi().get(`/users/${id}`);
            return data;
        } catch (e: unknown) {
            console.error(e);
            throw e;
        }
    }

    /** FIND ALL **/

    static async findAll(filter: GenericFilter) {
        try {
            const { data } = await useApi().get(`/users`, {params: filter});
            return data;
        } catch (e: unknown) {
            console.error(e);
            throw e;
        }
    }

    /** UPDATE **/

    static async changeUserRole(dto: Pick<UserInterface, 'id' | 'role'>) {
        try {
            const { data } = await useApi().patch(`/users/${dto.id}/role`, dto);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }
}