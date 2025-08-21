import type { OptionSelectInterface } from "../interfaces/input.interface";

export enum Difficulty {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
}

export function getDifficultyOptions(): OptionSelectInterface[] {
    return Object.values(Difficulty).map((value) => ({
        label: getDifficultyLabel(value),
        value,
    }));
}

export function getDifficultyLabel(value: Difficulty): string {
    switch(value) {
        case 'EASY': return 'Facile';
        case 'MEDIUM': return 'Moyen';
        case 'HARD': return 'Difficile';
        default: return value;
    }
}