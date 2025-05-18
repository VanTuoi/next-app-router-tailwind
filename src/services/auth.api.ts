import { LoginData, ResponseData, UserData } from "~/types";
import { apiSelector } from "~/utils";

const URL_LOGIN = "/login";
const URL_REGISTER = "/register";
const URL_LOGOUT = "/logout";

export const authApi = (type: "public" | "private" = "public") => {
    const http = apiSelector(type);

    return {
        login: (user: Partial<Pick<UserData, "email" | "password">>) =>
            http.post<ResponseData<LoginData>>(URL_LOGIN, user),
        register: (user: Pick<UserData, "email" | "password" | "name">) =>
            http.post<ResponseData<UserData>>(URL_REGISTER, user),
        logout: () => http.post<ResponseData<null>>(URL_LOGOUT)
    };
};
