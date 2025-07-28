import { helpers } from "@vuelidate/validators";

export function withMessage(message: string, validator: any) {
    return helpers.withMessage(message, validator);
}