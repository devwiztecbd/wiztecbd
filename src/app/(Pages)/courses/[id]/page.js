import CourseDetailsLayout from "@/widgets/CourseDetailsLayout";

import { previewCourse } from "@/app/staticData/coursePreview";

export default function CourseDetailsPage() {
    return <CourseDetailsLayout course={previewCourse} />;
}
