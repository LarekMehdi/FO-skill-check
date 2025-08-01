import { TestApi } from "../api/TestApi";
import type { GenericFilter } from "../interfaces/filter.interface";
import type { CreateTestInterface } from "../interfaces/test.interface";

export abstract class TestService {

    /** FIND ALL **/

    static async findAll(filter: GenericFilter) {
        return await TestApi.findAll(filter);
    }

    /** FIND **/

    static async findById(id: number) {
        return await TestApi.findById(id);
    }

    /** CREATE **/

    static async create(test: CreateTestInterface) {
        return await TestApi.create(test);
    }
}