import { ResponseData, UserData } from "~/types";
import { apiSelector } from "~/utils";

const URL = "/users";

export const usersApi = (type: "public" | "private" = "public") => {
    const http = apiSelector(type);

    return {
        getUsers: (params?: { search?: string }) => http.get<ResponseData<UserData[]>>(URL, { params }),

        getUser: (id: string) => http.get<ResponseData<UserData>>(`/${URL}/${id}`),

        createUser: (user: Partial<UserData>) => http.post<ResponseData<UserData>>(URL, user),

        updateUser: (id: string, user: Partial<UserData>) => http.put<ResponseData<UserData>>(`/${URL}/${id}`, user),

        deleteUser: (id: string) => http.delete<ResponseData<null>>(`/${URL}/${id}`)
    };
};
