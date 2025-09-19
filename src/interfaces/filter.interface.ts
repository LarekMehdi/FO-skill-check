import type { Difficulty } from "../constants/difficulty.constant";
import type { SortOrder } from "../constants/filter.constant";

export interface GenericFilter {
    limit: number;
    offset: number;
    sortBy?: string;
    sortOrder?: SortOrder;

}

export interface PageInterface<T> {
    datas: T[];
    totalElement: number;
}

export interface QuerySearchInterface {
    label: string;
}

export interface TestListFilterInterface extends GenericFilter {
    title: string | null;
}

export interface QuestionListFilterInterface extends GenericFilter {
    difficulty?: Difficulty | null;
    tagId?: number | null;
}