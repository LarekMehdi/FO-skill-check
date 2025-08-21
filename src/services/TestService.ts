import { TestApi } from "../api/TestApi";
import type { TestListFilterInterface } from "../interfaces/filter.interface";
import type { CreateTestInterface, SubmitTestInterface, TestSessionInterface, TestWithQuestionIds } from "../interfaces/test.interface";

export abstract class TestService {

    /** FIND ALL **/

    static async findAll(filter: TestListFilterInterface) {
        return await TestApi.findAll(filter);
    }

    static async exportAll(filter: TestListFilterInterface) {
        try {
            const blob: Blob = await TestApi.exportAll(filter);
            const url: string = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'test_export.xlsx');
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
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

    static async importExcel(file: File) {
        return await TestApi.importExcel(file);
    }

    /** DELETE **/

    static async deleteTest(id: number) {
        return await TestApi.deleteTest(id);
    }
}