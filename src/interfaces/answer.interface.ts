export interface AnswerInterface {
    id: number;
    content: string;
    isCorrect: boolean;
    questionId: number;
}

export interface ResultAnswerInterface {
    id: number;
    content: string;
    isCorrect: boolean;
    isSelectedByUser: boolean;
}