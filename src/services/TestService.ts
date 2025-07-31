import { TestApi } from "../api/TestApi";
import type { CreateTestInterface } from "../interfaces/test.interface";

export abstract class TestService {

    /** CREATE **/

    static async create(test: CreateTestInterface) {
        return await TestApi.create(test);
    }
}