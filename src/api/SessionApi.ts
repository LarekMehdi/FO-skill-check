import { useApi } from "./useApi";

export abstract class SessionApi {

    /** FIND **/

    static async findTestSession(id: number) {
        try {
            const { data } = await useApi().get(`sessions/${id}`);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }
}