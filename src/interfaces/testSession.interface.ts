import type { ResultQuestionInterface } from "./question.interface";

export interface ResultTestSessionInterface {
    sessionId: number;
    testId: number;
    userId: number;
    testTitle: string;
    questionList: ResultQuestionInterface[];
    createdAt: Date;
}

export interface UserTestSessionInterface {
    sessionId: number;
    testId: number;
    testTitle: string;
    createdAt: Date;
    successRate: number;
}