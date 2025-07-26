import { AuthApi } from "../api/AuthApi";

export abstract class AuthService {

    static async signin() {
        return await AuthApi.signin();
    }
}