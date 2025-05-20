import { Course } from "~/types";

import { CourseCarousel } from "./course-carousel";
import { CourseComments } from "./course-comments";
import { CourseDescription } from "./course-description";
import { CourseInfo } from "./course-info";

type Props = {
    courseData: Course;
};

export const CourseContent = ({ courseData }: Props) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:grid md:grid-cols-5 md:gap-5 md:p-6">
                <div className="order-1 md:order-none md:col-span-3">
                    <CourseCarousel images={courseData.images ?? []} />
                </div>

                <div className="order-2 flex flex-col gap-6 md:order-none md:col-span-2">
                    <CourseInfo courseData={courseData} />
                </div>

                <div className="order-3 mt-6 md:order-none md:col-span-3 md:mt-0">
                    <CourseDescription description={courseData.description} />
                </div>

                <div className="order-4 md:order-none md:col-span-3">
                    <CourseComments />
                </div>
            </div>
        </div>
    );
};
