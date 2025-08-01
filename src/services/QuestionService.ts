import { QuestionApi } from "../api/QuestionApi";
import type { CreateQuestionInterface } from "../interfaces/question.interface";

export abstract class QuestionService {

    /** CREATE **/
    
    static async create(question: CreateQuestionInterface) {
        return await QuestionApi.create(question);
    }
}