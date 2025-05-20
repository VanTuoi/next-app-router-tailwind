import { Category, ResponseData, TypeCategorySchema } from "~/types";
import { apiSelector } from "~/utils";

const URL = "/categories";

export const categoriesApi = (type: "public" | "private" = "public") => {
    const http = apiSelector(type);

    return {
        getCategories: () => http.get<ResponseData<Category[]>>(URL),
        createCategory: (category: TypeCategorySchema) => http.post<ResponseData<Category>>(URL, category),
        updateCategory: (id: string, category: TypeCategorySchema) =>
            http.put<ResponseData<Category>>(`${URL}/${id}`, category),
        deleteCategory: (id: string) => http.delete<ResponseData<null>>(`${URL}/${id}`)
    };
};
