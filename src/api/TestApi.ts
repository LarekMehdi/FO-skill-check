import type { GenericFilter } from "../interfaces/filter.interface";
import type { CreateTestInterface } from "../interfaces/test.interface";
import { useApi } from "./useApi";

export abstract class TestApi {

    /** FIND ALL **/

    static async findAll(filter: GenericFilter) {
        try {
            const { data } = await useApi().get(`/tests`);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

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