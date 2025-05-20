import { useRouter } from "next/navigation";

import { Course } from "~/types";
import { formatPrice } from "~/utils";

import { Rating } from "./rating";

export const CourseItem = ({ course }: { course: Course }) => {
    const router = useRouter();
    return (
        <div
            key={course.id}
            className="cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-600 dark:bg-gray-800"
            onClick={() => router.push(`/${course.id}`)}
        >
            <img
                src={course.image || "/assets/img/not-found.jpg"}
                alt={course.name}
                className="h-40 w-full object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <Rating size={15} value={Number(course?.rating)} />
                <div className="flex flex-row items-center gap-2">
                    {course.price_before_discount ? (
                        <>
                            <p className="text-xl font-semibold text-red-600">
                                {formatPrice(course.price_before_discount, "vi")}
                            </p>
                            <p className="font-semibold line-through">{formatPrice(course.price, "vi")}</p>
                        </>
                    ) : (
                        <p className="text-xl font-semibold">{formatPrice(course.price, "vi")}</p>
                    )}
                </div>

                <p className="mt-2 text-xs text-gray-400">
                    Mã: {course.course_code} - {course.category?.name} - {course.year}
                </p>
            </div>
        </div>
    );
};
