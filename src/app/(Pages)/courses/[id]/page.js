import CourseDetailsLayout from "@/widgets/CourseDetailsLayout";

// Static design data while the new course page is being built.
const previewCourse = {
    title: "AI-Powered Power BI Data Analyst",
    image: "/assets/images/training images/multi_domain_curriculum_lab.png",
    duration: "2 months",
    lectures: "16 classes",
    hours: "32 hours",
    enrollmentOptions: [
        { id: "online", label: "Online", description: "Attend live from anywhere", price: 8000 },
        { id: "offline", label: "Offline", description: "Learn in our classroom", price: 12000 },
    ],
};

export default function CourseDetailsPage() {
    return <CourseDetailsLayout course={previewCourse} />;
}
