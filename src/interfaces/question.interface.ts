import type { Difficulty } from "../constants/difficulty.constant";
import type { AnswerInterface } from "./answer.interface";
import type { TagInterface } from "./tag.interface";

export interface CreateQuestionInterface {
    content: string;
    isMultipleAnswer: boolean;
    timeLimit: number;
    difficulty: Difficulty;
    answers: CreateAnswerInterface[];
    tagIds: number[];
}

export interface CreateAnswerInterface {
    content: string;
    isCorrect: boolean;
}

export interface QuestionInterface {
    id: number;
    content: string;
    timeLimit: number;
    difficulty: Difficulty;
    tagList: TagInterface[];
}

export interface TakeQuestionInterface {
    id: number;
    content: string;
    timeLimit: number;
    isMultipleAnswer: boolean;
    choices: AnswerInterface[];
}

export interface SubmitQuestionInterface {
    questionId: number;
    selectedAnswerIds: number[];
}

