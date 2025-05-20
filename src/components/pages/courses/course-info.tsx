import { Course } from "~/types";

import { Rating } from "~/components/pages/home/rating";
import { Button } from "~/components/ui";

import { CoursePrice } from "./course-price";

type Props = {
    courseData: Course;
};

export const CourseInfo = ({ courseData }: Props) => {
    return (
        <div className="flex flex-col gap-1 p-1 sm:gap-2 sm:p-6">
            <h3 className="my-1 text-3xl font-semibold sm:text-4xl">{courseData.name}</h3>
            <h5 className="text-lg">{courseData.category?.name ?? "Không có danh mục"}</h5>
            <div className="flex flex-row items-center justify-start gap-2">
                <Rating size={16} value={Number(courseData.rating ?? 0)} />
                <p className="text-sm">Lượt xem: {courseData.view ?? 0}</p>
                <p className="text-sm">Lượt mua: {courseData.sold ?? 0}</p>
            </div>
            <CoursePrice price={courseData.price} priceBeforeDiscount={courseData.price_before_discount} />
            <p className="mt-2 text-sm text-gray-400">
                Mã: {courseData.course_code ?? "N/A"} - {courseData.year ?? "N/A"}
            </p>
            <Button className="h-[50px] w-full">Mua ngay</Button>
        </div>
    );
};
