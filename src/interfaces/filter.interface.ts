import type { SortOrder } from "../constants/filter.constant";

export interface GenericFilter {
    limit: number;
    offset: number;
    sortBy?: string;
    sortOrder?: SortOrder;

}