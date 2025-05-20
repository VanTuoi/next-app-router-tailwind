import Link from "next/link";
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
                className="h-25 w-full object-cover sm:h-40"
            />
            <div className="p-1: sm:p-2 md:p-4">
                <Link href={`/${course.id}`} className="text-lg font-semibold">
                    {course.name}
                </Link>
                <Rating size={15} value={Number(course?.rating)} />
                <div className="flex flex-row items-center gap-2">
                    {course.price_before_discount ? (
                        <>
                            <p className="text-lg font-semibold text-red-600 sm:text-xl">
                                {formatPrice(course.price, "vi")}
                            </p>
                            <p className="sm:text-md text-sm font-semibold line-through">
                                {formatPrice(course.price_before_discount, "vi")}
                            </p>
                        </>
                    ) : (
                        <p className="text-lg font-semibold sm:text-xl">{formatPrice(course.price, "vi")}</p>
                    )}
                </div>

                <p className="py-1 text-xs text-gray-400 sm:py-2">
                    Mã: {course.course_code} - {course.category?.name} - {course.year}
                </p>
            </div>
        </div>
    );
};
