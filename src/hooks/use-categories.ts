import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { config } from "~/constants";
import { categoriesApi } from "~/services";
import { Category, ResponseData, TypeCategorySchema } from "~/types";

export const useGetCategories = () => {
    const {
        data,
        isLoading: loading,
        error,
        refetch
    } = useQuery<Category[], ResponseData<null> | undefined>({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await categoriesApi("public").getCategories();
            return data.data || [];
        },
        staleTime: config.STALE_TIME,
        placeholderData: (prevData) => prevData
    });

    return {
        data: data || [],
        loading,
        error,
        refetch
    };
};

export const useCreateCategory = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    const {
        mutate: createCategory,
        isPending: loading,
        error
    } = useMutation<void, ResponseData<null> | undefined, TypeCategorySchema>({
        mutationFn: async (categoryData: TypeCategorySchema): Promise<void> => {
            await categoriesApi("private").createCategory(categoryData);
        },
        onSuccess: () => {
            onSuccessCallback?.();
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        }
    });

    return {
        createCategory,
        loading,
        error
    };
};

export const useUpdateCategory = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    const {
        mutate: updateCategory,
        isPending: loading,
        error
    } = useMutation<void, ResponseData<null> | undefined, TypeCategorySchema>({
        mutationFn: async (categoryData: TypeCategorySchema): Promise<void> => {
            await categoriesApi("private").updateCategory(categoryData.id, categoryData);
        },
        onSuccess: () => {
            onSuccessCallback?.();
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        }
    });

    return {
        updateCategory,
        loading,
        error
    };
};

export const useDeleteCategory = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    const {
        mutate: deleteCategory,
        isPending: loading,
        error
    } = useMutation<void, ResponseData<null> | undefined, string>({
        mutationFn: async (id: string): Promise<void> => {
            await categoriesApi("private").deleteCategory(id);
        },
        onSuccess: () => {
            onSuccessCallback?.();
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        }
    });

    return {
        deleteCategory,
        loading,
        error
    };
};
