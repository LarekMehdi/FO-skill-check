import type { Difficulty } from "../constants/difficulty.constant";
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
    tags: TagInterface[];
}