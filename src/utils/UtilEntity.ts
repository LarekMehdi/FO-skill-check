import type { OptionSelectInterface } from "../interfaces/input.interface";

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
}