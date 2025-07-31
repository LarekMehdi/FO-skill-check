import type { Difficulty } from "../constants/difficulty.constante";
import type { TagInterface } from "./tag.interface";

export interface CreateQuestionInterface {
    content: string;
    isMultipleAnswer: boolean;
    timeLimit: number;
    difficulty: Difficulty;
    answers: CreateAnswerInterface[];
    tags: TagInterface[];
}

export interface CreateAnswerInterface {
    content: string;
    isCorrect: boolean;
}