import type { Difficulty } from "../constants/difficulty.constant";

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