import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import config from "~/constants/config";
import { coursesApi } from "~/services";
import { Course, CourseInput, ResponseData } from "~/types";

import { QueryConfig } from "./use-query-config";

export const useGetCourseById = (id?: string) => {
    const {
        data,
        isFetching: loading,
        error,
        refetch
    } = useQuery({
        queryKey: ["course", id],
        queryFn: async (): Promise<Course | null> => {
            if (!id) return null;
            const res = await coursesApi("private").getCourse(id);
            return res.data.data ?? null;
        },
        enabled: !!id,
        staleTime: config.STALE_TIME
    });

    return {
        data,
        loading,
        error: error as unknown as ResponseData<null> | null,
        refetch
    };
};

export const useGetCourses = (params: QueryConfig) => {
    const {
        data,
        isLoading: loading,
        error,
        refetch
    } = useQuery({
        queryKey: ["courses", params],
        queryFn: async () => {
            try {
                const res = await coursesApi("private").getCourses(params);
                return {
                    courses: res.data.data || [],
                    meta: res.data.meta || { total_pages: 1, total_items: 0, page: 1, limit: 10 }
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
        meta: data?.meta ?? { total_pages: 1, total_items: 0, page: 1, limit: 10 },
        loading,
        error: error as unknown as ResponseData<null> | null,
        refetch
    };
};

export const useCreateCourse = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    const {
        mutate: createCourse,
        isPending: loading,
        error
    } = useMutation({
        mutationFn: async (courseData: CourseInput): Promise<Course | null> => {
            const res = await coursesApi("private").createCourse(courseData);
            return res.data.data;
        },
        onSuccess: (newCourse) => {
            if (newCourse) {
                onSuccessCallback?.();
                toast.success(`Đã tạo khóa học ${newCourse.name}`);
                queryClient.setQueryData<Course[]>(["courses"], (oldData) =>
                    oldData ? [...oldData, newCourse] : [newCourse]
                );
                queryClient.invalidateQueries({ queryKey: ["courses"] });
            }
        },
        onError: (err) => {
            console.error("Error creating course:", err);
            toast.error("Lỗi khi tạo khóa học");
        }
    });

    const data = queryClient.getQueryData<Course[]>(["courses"]);

    return {
        data,
        createCourse,
        loading,
        error: error as unknown as ResponseData<null> | null
    };
};

export const useUpdateCourse = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    const {
        mutate: updateCourse,
        isPending: loading,
        error
    } = useMutation({
        mutationFn: async ({ id, courseData }: { id: string; courseData: CourseInput }): Promise<void> => {
            await coursesApi("private").updateCourse(id, courseData);
        },
        onSuccess: (_data, { courseData }) => {
            toast.success(`Đã cập nhật khóa học ${courseData.name}`);
            onSuccessCallback?.();
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        },
        onError: (err) => {
            console.error("Error updating course:", err);
            toast.error("Lỗi khi cập nhật khóa học");
        }
    });

    return {
        updateCourse,
        loading,
        error: error as unknown as ResponseData<null> | null
    };
};

export const useDeleteCourse = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    const {
        mutate: deleteCourse,
        isPending: loading,
        error
    } = useMutation({
        mutationFn: async (course: Course): Promise<void> => {
            await coursesApi("private").deleteCourse(course.id);
        },
        onSuccess: (_data, course) => {
            toast.success(`Đã xóa khóa học ${course.name}`);
            onSuccessCallback?.();
            queryClient.setQueryData<Course[]>(["courses"], (oldData) =>
                oldData?.filter((item) => item.id !== course.id)
            );
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        },
        onError: (err) => {
            console.error("Error deleting course:", err);
            toast.error("Lỗi khi xóa khóa học");
        }
    });

    return {
        deleteCourse,
        loading,
        error: error as unknown as ResponseData<null> | null
    };
};
