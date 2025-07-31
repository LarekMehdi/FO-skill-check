import type { CreateTestInterface } from "../interfaces/test.interface";
import { useApi } from "./useApi";

export abstract class TestApi {

    /** CREATE **/

    static async create(test: CreateTestInterface) {
        try {
            const { data } = await useApi().post(`/tests`, test);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }
}