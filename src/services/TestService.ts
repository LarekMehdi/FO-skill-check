import { TestApi } from "../api/TestApi";
import type { GenericFilter } from "../interfaces/filter.interface";
import type { CreateTestInterface, SubmitTestInterface, TestSessionInterface, TestWithQuestionIds } from "../interfaces/test.interface";

export abstract class TestService {

    /** FIND ALL **/

    static async findAll(filter: GenericFilter) {
        return await TestApi.findAll(filter);
    }

    /** FIND **/

    static async findById(id: number) {
        return await TestApi.findById(id);
    }

    static async findTestToTake(id: number) {
        return await TestApi.findTestToTake(id);
    }

    /** UPDATE **/

    static async updateQuestions(testData: TestWithQuestionIds) {
        return await TestApi.updateQuestions(testData);
    }

    /** CREATE **/

    static async create(test: CreateTestInterface) {
        return await TestApi.create(test);
    }

    static async submitTestResult(submitData: SubmitTestInterface): Promise<TestSessionInterface> {
        return await TestApi.submitTestResult(submitData);
    }
}