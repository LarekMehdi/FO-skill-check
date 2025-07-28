import axios, { type AxiosInstance } from "axios";
import { useAuthStore } from "../stores/auth.store";


export function useApi() {

    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const refreshToken = authStore.refreshToken;

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    })

    // Juste avant l'envoi de la requète
    api.interceptors.request.use((config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        if(config.url === "auth/logout") {
            config.headers.Authorization = `Bearer ${refreshToken}`
        }

        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // if (error.response && error.response.status === 401) {
            //     if (originalRequest.url !== 'auth/refresh') {
            //         if (refreshToken) {
            //             try {
            //                 axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
            //                 const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}auth/refresh`)

            //                 if (res.status === 201) {
            //                     authStore.setAuthState({...res.data, imagePath: res.data.media?.fileUrl});
            //                     originalRequest.headers[
            //                         "Authorization"
            //                     ] = `Bearer ${res.data.accessToken}`

            //                     return axios(originalRequest);
            //                 }
            //             } catch (e: unknown) {
            //                 console.log(e);
            //                 return Promise.reject(error);
            //             }

            //         } else {
            //             location.href = "/signin"
            //         }
            //     } else {
            //         location.href = "/signin"
            //     }
            // }
            // if (error.response && error.response.status === 404) {
            //     console.log("ressource indispo");
            // }
            // if (error.response && error.response.status === 403 && originalRequest.url !== 'auth/signup') {
            //     location.href = "/error/403"
            // }
            return Promise.reject(error);
        }
    );

    return api
}