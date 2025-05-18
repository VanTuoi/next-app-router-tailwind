import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import config from "~/constants/config";
import HttpStatusCode from "~/constants/http-status-code.enum";
import { getNextAuthToken } from "~/utils";

const publicApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: config.TIMEOUT,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: config.WITH_CREDENTIALS
});

const privateApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: config.TIMEOUT,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: config.WITH_CREDENTIALS
});

privateApi.interceptors.request.use(
    async (config) => {
        const token = await getNextAuthToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

publicApi.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (
            ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(
                error.response?.status as number
            )
        ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any | undefined = error.response?.data;
            const message = data?.message || error.message;
            toast.error(message);
        }
        return Promise.reject(error.response?.data);
    }
);

privateApi.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (
            ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(
                error.response?.status as number
            )
        ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any | undefined = error.response?.data;
            const message = data?.message || error.message;
            toast.error(message);
        }
        return Promise.reject(error.response?.data);
    }
);

/**
 *
 * @param type public is api not used token, private is api used token
 * @returns
 */
export function apiSelector(type: "public" | "private" = "public") {
    return type === "public" ? publicApi : privateApi;
}
