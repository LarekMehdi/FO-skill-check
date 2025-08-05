import { QuestionApi } from "../api/QuestionApi";
import type { GenericFilter } from "../interfaces/filter.interface";
import type { CreateQuestionInterface } from "../interfaces/question.interface";

export abstract class QuestionService {

    /** FIND ALL **/

    static async findAll(filter: GenericFilter) {
        return await QuestionApi.findAll(filter);
    }

    /** CREATE **/
    
    static async create(question: CreateQuestionInterface) {
        return await QuestionApi.create(question);
    }
}