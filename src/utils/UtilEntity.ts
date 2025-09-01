import type { DataTablePageEvent, DataTableSortEvent } from "primevue";
import type { GenericFilter } from "../interfaces/filter.interface";
import type { OptionSelectInterface } from "../interfaces/input.interface";
import { SortOrder } from "../constants/filter.constant";

export abstract class UtilEntity {

    static formatListForInputSelect<T>(items: T[], displayField: keyof T, valueField: keyof T): OptionSelectInterface[] {
        const options: OptionSelectInterface[] = [];
        for (const item of items) {
            const option: OptionSelectInterface = {
                label: String(item[displayField]),
                value: item[valueField] as string|number|boolean,
            }
            options.push(option);
        }
        return options;
    }

    static updateFilterOnPage(event: DataTablePageEvent, filter: GenericFilter): GenericFilter {
        filter.offset = event.first;
        filter.limit = event.rows;
        return filter;
    }

    static updateFilterOnSort(event: DataTableSortEvent, filter: GenericFilter): GenericFilter {
        filter.sortBy = event.sortField as string;

        if (event.sortOrder === 1) {
            filter.sortOrder = SortOrder.ASC;
        } else if (event.sortOrder === -1) {
            filter.sortOrder = SortOrder.DESC;
        } else {
            filter.sortOrder = undefined;
        }
    
        return filter;
    }

    static displaySuccessRate(successRate: number) {
        return Number((successRate * 100).toFixed(1));
    }
 }