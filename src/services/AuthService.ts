import { AuthApi } from "../api/AuthApi";
import type { SigninDataInterface } from "../interfaces/auth.interface";

export abstract class AuthService {

    static async signin(signinData: SigninDataInterface) {
        return await AuthApi.signin(signinData);
    }
}