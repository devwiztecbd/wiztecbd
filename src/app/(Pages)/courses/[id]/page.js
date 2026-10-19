"use client";

import { useParams } from "next/navigation";
import CourseDetailsLayout from "@/widgets/CourseDetailsLayout";
import { previewCourse } from "@/app/staticData/coursePreview";
import useCourse from "@/hooks/useCourse";

export default function CourseDetailsPage({ params }) {
    const routeParams = useParams();
    const courseId = params?.id || routeParams?.id;
    const { course, loading } = useCourse(courseId);

    const activeCourse = course || previewCourse;

    return <CourseDetailsLayout course={activeCourse} loading={loading} />;
}
