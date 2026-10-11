"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import ScrollAnimatedSection from "@/components/ScrollAnimationSection";
import useEdgeScroll from "@/hooks/useEdgeScroll";
import useCourses from "@/hooks/useCourses";
import useServices from "@/hooks/useServices";
import EnrollPop from "@/components/EnrolePop";
import Tabs from "@/components/Tabs";
import { getCourseSlug } from "@/utils/courseSlug";
import Course from "../Course";

const PopularCourses = () => {
    const [activeTab, setActiveTab] = useState("all");
    const scrollContainerRef1 = useEdgeScroll("horizontal", 5, 25);
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState("");
    const router = useRouter();

    const { courses, loading: coursesLoading, error: coursesError } = useCourses();
    const { services, loading: servicesLoading, error: servicesError } = useServices("courses-service");

    const handlEnrole = (e, data) => {
        e.preventDefault();
        e.stopPropagation(); // Fix click propagation causing redirection
        setIsOpen(true);
        setModalData(data);
    };

    const dynamicTabs = useMemo(() => {
        const baseTabs = [{ id: "all", label: "all" }];
        const fetchedTabs = (services || []).map((service) => ({
            id: service.id,
            label: service.name,
        }));
        return [...baseTabs, ...fetchedTabs];
    }, [services]);

    const isActiveTabs = useMemo(() => {
        if (activeTab === "all") return courses;
        return (courses || []).filter((course) => course.serviceID === activeTab);
    }, [activeTab, courses]);

    const handleMainClick = (course) => {
        router.push(`/courses/${getCourseSlug(course)}`);
    };

    const isLoading = coursesLoading || servicesLoading;
    const hasError = coursesError || servicesError;

    return (
        <>
            <div className="md:mb-12 mb-6">
                <ScrollAnimatedSection>
                    <h1 className=" text-center  text-H1   font-bold mb-2">Popular Courses</h1>
                </ScrollAnimatedSection>
            </div>
            
            {!isLoading && !hasError && (
                <Tabs tabs={dynamicTabs} isTab={activeTab} setIsTab={setActiveTab} />
            )}

            {isLoading ? (
                <div className=" h-256 flex items-center justify-center">
                    <p className="text-H6 text-center font-semibold text-black/50">Loading courses...</p>
                </div>
            ) : hasError ? (
                <div className=" h-256 flex items-center justify-center">
                    <p className="text-H6 text-center font-semibold text-black/50">Failed to load courses.</p>
                </div>
            ) : isActiveTabs.length > 0 ? (
                <div className="whitespace-nowrap md:scroll-container overflow-x-auto md:overflow-x-hidden no-scrollbar flex gap-4 mt-6 md:mt-12" ref={scrollContainerRef1}>
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
                <div className=" h-256 flex items-center justify-center">
                    <h6 className=" text-H6 text-center font-semibold text-black/50">Course Not Available</h6>
                </div>
            )}
            <EnrollPop isOpen={isOpen} onClose={() => setIsOpen(false)} modalData={modalData} />
        </>
    );
};

export default PopularCourses;
