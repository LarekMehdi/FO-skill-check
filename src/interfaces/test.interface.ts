import type { QuestionInterface } from "./question.interface";

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
    questions: QuestionInterface[]
}