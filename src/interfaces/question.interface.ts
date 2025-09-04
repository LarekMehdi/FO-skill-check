import type { Difficulty } from "../constants/difficulty.constant";
import type { AnswerInterface, ResultAnswerInterface, SmallAnswerInterface } from "./answer.interface";
import type { TagInterface } from "./tag.interface";
import type { SmallTestInterface } from "./test.interface";
import type { SmallUserInterface } from "./user.interface";

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

export interface QuestionDetailsInterface extends SmallQuestionInterface {
    isMultipleAnswer: boolean;
    successRate: number;
    doneCount: number;
    correctCount: number;
    timeLimit: number;
    difficulty: Difficulty;
    createdBy: SmallUserInterface;
    answerList: SmallAnswerInterface[];
    tagList: TagInterface[];
    testList: SmallTestInterface[];
}

export interface QuestionListInterface extends SmallQuestionInterface {
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

