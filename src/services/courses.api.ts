import { QueryConfig } from "~/hooks/use-query-config";
import { Course, CourseInput, ResponseData } from "~/types";
import { apiSelector } from "~/utils";
const URL = "/courses";

export const coursesApi = (type: "public" | "private" = "public") => {
    const http = apiSelector(type);

    return {
        getCourses: (params: QueryConfig) => http.get<ResponseData<Course[]>>(URL, { params }),

        getCourse: (id: string) => http.get<ResponseData<Course>>(`${URL}/${id}`),

        createCourse: (course: Partial<CourseInput>) => http.post<ResponseData<Course>>(URL, course),

        updateCourse: (id: string, course: Partial<CourseInput>) =>
            http.put<ResponseData<Course>>(`${URL}/${id}`, course),

        deleteCourse: (id: string) => http.delete<ResponseData<null>>(`${URL}/${id}`)
    };
};
