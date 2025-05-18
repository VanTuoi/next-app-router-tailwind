"use client";

import { useGetCourses, useQueryConfig } from "~/hooks";

import { Filter } from "~/components/pages/home/filter";
import { Courses } from "~/components/pages/home/item";
import { SkeletonLoader } from "~/components/pages/home/skeleton-loader";
import { Sort } from "~/components/pages/home/sort";
import { Pagination } from "~/components/pagination";

const CoursePage = () => {
    const queryConfig = useQueryConfig();

    const { data: courses = [], meta, loading } = useGetCourses(queryConfig);

    return (
        <div className="grid grid-cols-5">
            <div className="col-span-1 p-1">
                <Filter queryConfig={queryConfig} />
            </div>
            <div className="col-span-4 p-1">
                <div className="flex w-full justify-end">
                    <Sort queryConfig={queryConfig} />
                </div>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <SkeletonLoader />
                    ) : courses.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-gray-600">
                            Không tìm thấy khoá học nào.
                        </div>
                    ) : (
                        courses.map((course) => <Courses key={course.id} course={course} />)
                    )}
                </div>
                {courses.length !== 0 && <Pagination queryConfig={queryConfig} pageSize={meta.total_pages} />}
            </div>
        </div>
    );
};

export default CoursePage;
