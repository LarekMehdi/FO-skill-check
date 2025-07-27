import type { SigninDataInterface } from "../interfaces/auth.interface"
import { useApi } from "./useApi"

export abstract class AuthApi {

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
}