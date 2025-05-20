import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { config } from "~/constants";
import { coursesApi } from "~/services";
import { Course, CourseFormData, PaginationMeta, ResponseData } from "~/types";

import { QueryConfig } from "./use-query-config";

export const useGetCourseById = (id?: string) => {
    const {
        data,
        isFetching: loading,
        error,
        refetch
    } = useQuery<Course | null, ResponseData<null> | undefined>({
        queryKey: ["course", id],
        queryFn: async (): Promise<Course | null> => {
            if (!id) return null;
            const res = await coursesApi("public").getCourse(id);
            return res.data.data;
        },
        enabled: !!id,
        staleTime: config.STALE_TIME,
        retry: 1
    });

    return {
        data,
        loading,
        error,
        refetch
    };
};

export const useGetCourses = (params: QueryConfig) => {
    const {
        data,
        isLoading: loading,
        error,
        refetch
    } = useQuery<
        {
            courses: Course[];
            meta: PaginationMeta;
        },
        ResponseData<null> | undefined
    >({
        queryKey: ["courses", params],
        queryFn: async () => {
            const { data } = await coursesApi("public").getCourses(params);
            return {
                courses: data.data || [],
                meta: data.meta || { total_pages: 1, total_items: 0, page: 1, limit: "10" }
            };
        },
        staleTime: config.STALE_TIME,
        placeholderData: (prevData) => prevData
    });

    return {
        data: data?.courses || [],
        meta: data?.meta ?? { total_pages: 1, total_items: 0, page: 1, limit: 10 },
        loading,
        error,
        refetch
    };
};

export const useCreateCourse = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    const {
        mutate: createCourse,
        isPending: loading,
        error
    } = useMutation<Course | null, ResponseData<null> | undefined, CourseFormData>({
        mutationFn: async (courseData: CourseFormData): Promise<Course | null> => {
            const res = await coursesApi("private").createCourse(courseData);
            return res.data.data;
        },
        onSuccess: (newCourse) => {
            if (newCourse) {
                onSuccessCallback?.();
                queryClient.invalidateQueries({ queryKey: ["courses"] });
            }
        }
    });

    return {
        createCourse,
        loading,
        error
    };
};

export const useUpdateCourse = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    const {
        mutate: updateCourse,
        isPending: loading,
        error
    } = useMutation<void, ResponseData<null> | undefined, { id: string; courseData: CourseFormData }>({
        mutationFn: async ({ id, courseData }: { id: string; courseData: CourseFormData }): Promise<void> => {
            await coursesApi("private").updateCourse(id, courseData);
        },
        onSuccess: () => {
            onSuccessCallback?.();
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        }
    });

    return {
        updateCourse,
        loading,
        error
    };
};

export const useDeleteCourse = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    const {
        mutate: deleteCourse,
        isPending: loading,
        error
    } = useMutation<void, ResponseData<null> | undefined, string>({
        mutationFn: async (id: string): Promise<void> => {
            await coursesApi("private").deleteCourse(id);
        },
        onSuccess: () => {
            onSuccessCallback?.();
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        }
    });

    return {
        deleteCourse,
        loading,
        error
    };
};
