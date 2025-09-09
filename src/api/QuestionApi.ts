import type { GenericFilter } from "../interfaces/filter.interface";
import type { CreateQuestionInterface, QuestionHasTagInterface, UpdateQuestionInterface } from "../interfaces/question.interface";
import { useApi } from "./useApi";

export abstract class QuestionApi {

    /** FIND **/

    static async findDetails(id: number) {
        try {
            const { data } = await useApi().get(`questions/${id}`);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    /** FIND ALL **/

    static async findAll(filter: GenericFilter) {
        try {
            const { data } = await useApi().get(`questions`, {params: filter});
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    /** CREATE **/

    static async create(question: CreateQuestionInterface) {
        try {
            const { data } = await useApi().post(`questions`, question);
            return data;
        } catch(error: unknown) {
            console.error(error);
            throw error;
        }
    }

    /** UPDATE **/

    static async addTagToQuestion(questionTag: QuestionHasTagInterface) {
        try {
            const { data } = await useApi().patch(`questions/${questionTag.questionId}/tag/add`, questionTag);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    static async removeTagFromQuestion(questionTag: QuestionHasTagInterface) {
        try {
            const { data } = await useApi().patch(`questions/${questionTag.questionId}/tag/remove`, questionTag);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    static async update(updatedQuestion: UpdateQuestionInterface) {
        try {
            const { data } = await useApi().put(`questions/${updatedQuestion.id}`, updatedQuestion);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    /** DELETE **/

    static async delete(questionId: number) {
        try {
            const { data } = await useApi().delete(`questions/${questionId}`);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }
}