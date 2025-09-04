export interface SmallAnswerInterface {
    id: number;
    content: string;
    isCorrect: boolean;
}

export interface AnswerInterface extends SmallAnswerInterface {
    questionId: number;
}

export interface ResultAnswerInterface {
    id: number;
    content: string;
    isCorrect: boolean;
    isSelectedByUser: boolean;
}