import type { CreateQuestionInterface } from "../interfaces/question.interface";
import { useApi } from "./useApi";

export abstract class QuestionApi {

    /** CREATE **/

    static async create(question: CreateQuestionInterface) {
         try {
            const { data } = await useApi().post(`questions`, question);
            return data;
        }
        catch(error) {
            console.error(error);
            throw error;
        }
    }
}