"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import ScrollAnimatedSection from "@/components/ScrollAnimationSection";
import { courseList } from "@/app/staticData/course";
import useEdgeScroll from "@/hooks/useEdgeScroll";
import useCourses from "@/hooks/useCourses";
import EnrollPop from "@/components/EnrolePop";
import { getCourseSlug } from "@/utils/courseSlug";
import Course from "../Course";

const OurCourses = () => {
    const [tab, setTab] = useState(null); // default: show all courses with no selected tab
    const scrollContainerRef = useEdgeScroll("horizontal", 5, 25);
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState("");
    const router = useRouter();

    const { courses, loading, error } = useCourses();

    const handlEnrole = (e, data) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
        setModalData(data);
    };

    // Map courseList tab id → course_type string
    const selectedType = courseList.find((cl) => cl.id === tab)?.status || null;
    const isActiveTabs = selectedType ? courses.filter((c) => c.course_type === selectedType) : courses;

    const handleMainClick = (course) => {
        router.push(`/courses/${getCourseSlug(course)}`);
    };

    return (
        <div>
            <div className=" md:mb-12 mb-6">
                <h1 className=" text-center  text-H1   font-bold mb-2">Our Courses</h1>
            </div>
            <div className="md:gap-6 gap-4 md:scroll-container overflow-x-auto md:overflow-x-hidden no-scrollbar flex whitespace-nowrap md:justify-center">
                {courseList.map((list) => (
                    <ScrollAnimatedSection key={list.id} delay={400}>
                        <div onClick={() => setTab(list.id)} className={`flex flex-col z-0 items-center cursor-pointer  hover-bg-left-to-right ${tab == list.id ? "bg-primary text-white" : "bg-white"}  md:p-6 p-4 shadow-xl transform transition duration-500 hover:-translate-y-10px`}>
                            <img src={list.image1} height={48} width={48} alt="all" className={`${tab == list.id ? "hidden" : "inline"} md:h-12 md:w-12 h-8 w-8  hover-content transform transition duration-500 `} />
                            <img src={list.image2} height={48} width={48} alt="all" className={`${tab == list.id ? " inline text-white" : "hidden"} md:h-12 md:w-12 h-8 w-8 hover-content transform transition duration-500 `} />
                            <h3 className="md:text-xl  text-center font-bold md:mt-4 mt-2  z-10 capitalize">{list.status} Courses</h3>
                        </div>
                    </ScrollAnimatedSection>
                ))}
            </div>

            {loading ? (
                <div className=" h-32 flex items-center justify-center">
                    <p className="text-H6 text-center font-semibold text-black/50">Loading courses...</p>
                </div>
            ) : error ? (
                <div className=" h-32 flex items-center justify-center">
                    <p className="text-H6 text-center font-semibold text-black/50">Failed to load courses.</p>
                </div>
            ) : isActiveTabs.length > 0 ? (
                <div className="whitespace-nowrap md:scroll-container overflow-x-auto md:overflow-x-hidden no-scrollbar flex gap-4 mt-6 md:mt-12" ref={scrollContainerRef}>
                    {isActiveTabs.map((data) => (
                        <div onClick={() => handleMainClick(data)} key={data.id} className=" cursor-pointer">
                            <Course
                                id={data.id}
                                img={data.image}
                                alt={data.title}
                                title={data.title}
                                price={data.price}
                                seats={data.seats}
                                houre={data.hour}
                                time={data.time}
                                classes={data.classes}
                                status={data.course_type}
                                handlEnrole={handlEnrole}
                                classTime={data.class_duration}
                                duration={data.duration}
                                link={data.apply_link || null}
                                linkText={"Register Now"}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className=" h-32 flex items-center justify-center">
                    <h6 className=" text-H6 text-center font-semibold text-black/50 capitalize">{selectedType ? `${selectedType} Course Not Available` : "Course Not Available"}</h6>
                </div>
            )}
            <EnrollPop isOpen={isOpen} onClose={() => setIsOpen(false)} modalData={modalData} />
        </div>
    );
};

export default OurCourses;
