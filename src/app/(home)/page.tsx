"use client";

import { path } from "~/constants";
import { useGetCourses, useQueryConfig } from "~/hooks";

import { CourseItem, CourseSkeleton, EmptyState, Filter, Sort } from "~/components/pages/home";
import { Pagination } from "~/components/pagination";

const CoursePage = () => {
    const queryConfig = useQueryConfig();
    const {
        data: courses,
        meta = { total_pages: 1, total_items: 0, page: 1, limit: 10 },
        loading,
        error
    } = useGetCourses(queryConfig);

    if (error) {
        return <div className="p-6 text-center text-red-600">Lỗi: {error.message}</div>;
    }

    return (
        <div className="mt-1 grid grid-cols-1 gap-1 sm:gap-4 md:mt-2 md:grid-cols-5">
            <div className="order-1 md:order-none md:col-span-1">
                <Filter queryConfig={queryConfig} />
            </div>
            <div className="order-2 md:col-span-4">
                <div className="flex justify-end">
                    <Sort queryConfig={queryConfig} />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-4 lg:grid-cols-3">
                    {loading ? (
                        <CourseSkeleton count={6} />
                    ) : courses.length === 0 ? (
                        <EmptyState />
                    ) : (
                        courses.map((course) => <CourseItem key={course.id} course={course} />)
                    )}
                </div>
                {courses.length > 0 && (
                    <Pagination path={path.HOME} queryConfig={queryConfig} pageSize={meta.total_pages} />
                )}
            </div>
        </div>
    );
};

export default CoursePage;
