export abstract class UtilDate {

    /** DISPLAY **/

    static displayDateFr(dateInput: string | Date): string {
        const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
        const formatted = date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        return formatted;
    }
}