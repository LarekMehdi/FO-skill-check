import type { Difficulty } from "../constants/difficulty.constante";

export interface CreateQuestionInterface {
    content: string;
    isMultipleAnswer: boolean;
    timeLimit: number;
    difficulty: Difficulty;
    answers: CreateAnswerInterface[];
}

export interface CreateAnswerInterface {
    content: string;
    isCorrect: boolean;
}