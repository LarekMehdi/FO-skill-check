import type { TestListFilterInterface } from "../interfaces/filter.interface";
import type { CreateTestInterface, SubmitTestInterface, TestWithQuestionIds } from "../interfaces/test.interface";
import { useApi } from "./useApi";

export abstract class TestApi {

    /** FIND ALL **/

    static async findAll(filter: TestListFilterInterface) {
        try {
            const { data } = await useApi().get(`/tests`, {params: filter});
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    static async exportAll(filter: TestListFilterInterface) {
        try {
            const { data } = await useApi().get(`tests/export`, {params: filter, responseType: 'blob'});
            return new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    /** FIND **/

    static async findById(id: number) {
        try {
            const { data } = await useApi().get(`/tests/${id}`);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    static async findTestToTake(id: number) {
        try {
            const { data } = await useApi().get(`tests/${id}/takeTest`);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    /** UPDATE **/

    static async updateQuestions(testData: TestWithQuestionIds) {
        try {
            const { data } = await useApi().put(`/tests/questions`, testData);
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

    static async submitTestResult(submitData: SubmitTestInterface) {
        try {
            const { data } = await useApi().post(`/tests/${submitData.id}/submit`, submitData);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    static async importExcel(file: File) {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const { data } = await useApi().post("/tests/import", formData, { headers: { "Content-Type": "multipart/form-data" }});
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }
}