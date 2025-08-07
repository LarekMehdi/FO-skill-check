import type { ResultQuestionInterface } from "./question.interface";

export interface ResultTestSessionInterface {
    sessionId: number;
    testId: number;
    userId: number;
    testTitle: string;
    questionList: ResultQuestionInterface[];
}