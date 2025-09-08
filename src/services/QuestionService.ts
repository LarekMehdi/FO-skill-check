import { QuestionApi } from "../api/QuestionApi";
import type { GenericFilter } from "../interfaces/filter.interface";
import type { CreateQuestionInterface, QuestionHasTagInterface } from "../interfaces/question.interface";

export abstract class QuestionService {

    /** FIND **/

    static async findDetails(id: number) {
        return await QuestionApi.findDetails(id);
    }

    /** FIND ALL **/

    static async findAll(filter: GenericFilter) {
        return await QuestionApi.findAll(filter);
    }

    /** CREATE **/
    
    static async create(question: CreateQuestionInterface) {
        return await QuestionApi.create(question);
    }

    /** UPDATE **/

    static async addTagToQuestion(questionTag: QuestionHasTagInterface) {
        return await QuestionApi.addTagToQuestion(questionTag);
    }

    static async removeTagFromQuestion(questionTag: QuestionHasTagInterface) {
        return await QuestionApi.removeTagFromQuestion(questionTag);
    }

    /** DELETE **/

    static async delete(questionId: number) {
        return await QuestionApi.delete(questionId);
    }
}