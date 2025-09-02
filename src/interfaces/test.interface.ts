import type { QuestionInterface, SubmitQuestionInterface, TakeQuestionInterface } from "./question.interface";


export interface SmallTestInterface {
    id: number;
    title: string;
}
export interface CreateTestInterface {
    title: string;
    description: string;
}

export interface TestInterface extends CreateTestInterface {
    id: number;
    successrate: number;
    timeLimit: number;
    createdBy: number;
}

export interface TestDetailsInterface {
    id: number;
    title: string;
    description: string;
    successRate: number;
    timeLimit: number;
    questionList: QuestionInterface[]
}

export interface TestWithQuestionIds {
    testId: number;
    questionIds: number[];
}

export interface TakeTestInterface {
    id: number;
    title: string;
    questionList: TakeQuestionInterface[];
}

export interface SubmitTestInterface {
    id: number;
    answers: SubmitQuestionInterface[];
}

export interface TestSessionInterface {
    id: number;
    testId: number;
    userId: number;
    createdAt: Date;
}