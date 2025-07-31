import type { CreateTagInterface } from "../interfaces/tag.interface";
import { useApi } from "./useApi";

export abstract class TagApi {

    /** CREATE **/

    static async create(tag: CreateTagInterface) {
        try {
            const { data } = await useApi().post(`tags`, tag);
            return data;
        }
        catch(error) {
            console.error(error);
            throw error;
        }
    }
}