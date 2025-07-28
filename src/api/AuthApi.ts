import type { SigninDataInterface, SignupDataInterface } from "../interfaces/auth.interface"
import { useApi } from "./useApi"

export abstract class AuthApi {

    /** SIGNIN **/

    static async signin(signinData: SigninDataInterface) {
        try {
            const { data } = await useApi().post(`auth/signin`, signinData);
            return data;
        }
        catch(error) {
            console.error(error);
            throw error;
        }
    }

    /** SIGNUP **/

    static async signup(signupData: SignupDataInterface) {
        try {
            const { data } = await useApi().post(`auth/signup`, signupData);
            return data;
        }
        catch(error) {
            console.error(error);
            throw error;
        }
    }
}