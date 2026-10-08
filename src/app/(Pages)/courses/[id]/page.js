import CourseDetailsLayout from "@/widgets/CourseDetailsLayout";

// Static design data while the new course page is being built.
const previewCourse = {
    title: "AI-Powered Power BI Data Analyst",
    image: "/assets/images/training images/multi_domain_curriculum_lab.png",
    enrollmentOptions: [
        { id: "online", label: "Online", description: "Attend live from anywhere", price: 8000, duration: "2 months", classes: "16 classes", learningHours: "32 hours", classDuration: "2 hours" },
        { id: "offline", label: "Offline", description: "Learn in our classroom", price: 12000, duration: "3 months", classes: "24 classes", learningHours: "48 hours", classDuration: "2 hours" },
    ],
};

export default function CourseDetailsPage() {
    return <CourseDetailsLayout course={previewCourse} />;
}
