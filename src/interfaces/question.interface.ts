import type { Difficulty } from "../constants/difficulty.constante";

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