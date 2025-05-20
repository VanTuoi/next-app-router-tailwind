"use client";

import { useGetCourseById } from "~/hooks";

import { CourseContent, CourseSkeleton, EmptyState } from "~/components/pages/courses";

type Props = {
    params: {
        "courses-id": string;
    };
};

const Page = ({ params }: Props) => {
    const courseId = params["courses-id"];

    const { data: courseData, loading } = useGetCourseById(courseId ?? undefined);

    if (loading) {
        return <CourseSkeleton />;
    }

    if (!courseData || !courseId) {
        return <EmptyState />;
    }

    return <CourseContent courseData={courseData} />;
};

export default Page;
