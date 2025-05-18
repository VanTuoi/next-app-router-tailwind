import { useQuery } from "@tanstack/react-query";

import config from "~/constants/config";
import { categoriesApi } from "~/services";
import { ResponseData } from "~/types";

export const useGetCategories = () => {
    const {
        data,
        isLoading: loading,
        error,
        refetch
    } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            try {
                const res = await categoriesApi("private").getCourses();
                return {
                    courses: res.data.data || []
                };
            } catch (err) {
                throw err;
            }
        },
        staleTime: config.STALE_TIME,
        placeholderData: (prevData) => prevData
    });

    return {
        data: data?.courses || [],
        loading,
        error: error as unknown as ResponseData<null> | null,
        refetch
    };
};
