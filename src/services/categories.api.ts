import { Category, ResponseData } from "~/types";
import { apiSelector } from "~/utils";

const URL = "/categories";

export const categoriesApi = (type: "public" | "private" = "public") => {
    const http = apiSelector(type);

    return {
        getCourses: () => http.get<ResponseData<Category[]>>(URL)
    };
};
