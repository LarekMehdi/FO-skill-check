import { SessionApi } from "../api/SessionApi";

export abstract class SessionService {

    /** FIND **/

    static async findTestSession(id: number) {
        return await SessionApi.findTestSession(id);
    }
}