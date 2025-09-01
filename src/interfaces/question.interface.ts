import type { Difficulty } from "../constants/difficulty.constant";
import type { AnswerInterface, ResultAnswerInterface } from "./answer.interface";
import type { TagInterface } from "./tag.interface";

export interface SmallQuestionInterface {
    id: number;
    content: string;
    code?: string;
}

export interface CreateQuestionInterface {
    content: string;
    code: string;
    timeLimit: number;
    difficulty: Difficulty;
    answers: CreateAnswerInterface[];
    tagIds: number[];
}

export interface CreateAnswerInterface {
    content: string;
    isCorrect: boolean;
}

export interface QuestionInterface extends SmallQuestionInterface {
    timeLimit: number;
    difficulty: Difficulty;
    tagList: TagInterface[];
}

export interface QuestionListInterface extends SmallQuestionInterface {
    successRate: number;
    doneCount: number;
    tagList: TagInterface[];
}

export interface TakeQuestionInterface extends SmallQuestionInterface {
    timeLimit: number;
    isMultipleAnswer: boolean;
    choices: AnswerInterface[];
}

export interface SubmitQuestionInterface {
    questionId: number;
    selectedAnswerIds: number[];
}

export interface ResultQuestionInterface extends SmallQuestionInterface {
    isCorrect: boolean;
    isMultipleAnswer: boolean;
    choices: ResultAnswerInterface[];
}

