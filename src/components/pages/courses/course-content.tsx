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
            <div className="grid grid-cols-5 gap-6 p-6">
                <div className="col-span-3 flex flex-col gap-6">
                    <CourseCarousel images={courseData.images ?? []} />
                    <CourseDescription description={courseData.description} />
                    <CourseComments />
                </div>
                <div className="col-span-2 flex flex-col gap-6">
                    <CourseInfo courseData={courseData} />
                </div>
            </div>
        </div>
    );
};
