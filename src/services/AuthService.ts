import { AuthApi } from "../api/AuthApi";
import type { SigninDataInterface, SignupDataInterface } from "../interfaces/auth.interface";

export abstract class AuthService {

    /** SIGNIN **/

    static async signin(signinData: SigninDataInterface) {
        return await AuthApi.signin(signinData);
    }

    /** SIGNUP **/

    static async signup(signupData: SignupDataInterface) {
        return await AuthApi.signup(signupData);
    }
}