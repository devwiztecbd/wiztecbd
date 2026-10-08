"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";

import Banner from "@/components/Banner";
import { RootSection, Section } from "@/components/Section";
import IntroDesign from "@/widgets/IntroDesign";
import CourseOverview from "@/widgets/CourseOverview";
import useCourse from "@/hooks/useCourse";
import useCourses from "@/hooks/useCourses";
import { resolveCourseIdFromSlug } from "@/utils/courseSlug";
import staticCourses from "/public/Json/courses.json";

// API lists may arrive as arrays or JSON strings. Plain text is supported
// only for text lists; software and audience lists require object arrays.
const normalizeCourseList = (value, allowText = false) => {
    if (Array.isArray(value)) return value;
    if (typeof value !== "string" || !value.trim()) return [];

    try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed;
        if (allowText && typeof parsed === "string" && parsed.trim()) return [parsed];
        return [];
    } catch {
        return allowText ? [value.trim()] : [];
    }
};

/**
 * Maps a raw API course object into the nested shape expected by
 * Banner, IntroDesign, and CourseOverview / CourseDetails.
 */
const mapApiCourse = (course, courseId) => {
    // Slider and selected overview blocks must come from static course data only.
    const staticCourse = staticCourses.find((c) => Number(c.id) === Number(courseId));
    const curriculumItems = normalizeCourseList(course.course_curriculum, true);
    const softwares = normalizeCourseList(course.softwares_included);
    const audiences = normalizeCourseList(course.designed_for);
    const careers = normalizeCourseList(course.career_opportunities);
    const jobPositions = normalizeCourseList(course.open_job_positions, true);

    const facilities = {
        houre: course.hour,
        seats: course.seats,
        time: course.time,
        classes: course.classes,
        day: normalizeCourseList(course.days, true).filter((day) => typeof day === "string" && day.trim()).join(", "),
    };

    const introFacilities = [
        { name: "Duration", value: course.duration, type: "month" },
        { name: "Lectures", value: course.lectures },
        { name: "Projects", value: course.projects, type: "plus" },
    ];

    const curriculum =
        curriculumItems.length > 0
            ? {
                  title: "Course Curriculum",
                  lists: curriculumItems.map((item, i) => ({ id: i + 1, content: item })),
              }
            : null;

    const software_learn =
        softwares.length > 0
            ? {
                  title: "Softwares You'll Learn",
                  list: softwares.map((s) => ({
                      id: s.id,
                      title: s.name,
                      icon: s.image,
                      alt: s.name,
                  })),
              }
            : null;

    const designed =
        audiences.length > 0
            ? {
                  title: "This Course is Designed for",
                  list: audiences.map((d) => ({
                      id: d.id,
                      title: d.name,
                      icon: d.image,
                  })),
              }
            : null;

    const opportunities =
        careers.length > 0
            ? {
                  title: "Career Opportunities",
                  list: careers.map((c) => ({
                      id: c.id,
                      description: c.name,
                      icon: c.image,
                  })),
              }
            : null;

    const open_job =
        jobPositions.length > 0
            ? {
                  title: "Open Job Positions",
                  list: jobPositions.map((item, i) => ({ id: i + 1, content: item })),
              }
            : null;

    // These two sections are not in the API — use static JSON data by matching course ID
    const solutions = staticCourse?.course_overview?.solutions || null;
    const sliderImage = Array.isArray(staticCourse?.course_overview?.sliderImage) ? staticCourse.course_overview.sliderImage : [];

    const course_overview = {
        title: "Course Overview",
        overview: course.overview_description,
        curriculum,
        software_learn,
        designed,
        opportunities,
        open_job,
        solutions,
        sliderImage,
    };

    const introData = {
        img: course.image,
        header: course.description,
        title: "Level Up Your Skills",
        sub_title: "Turn Your Passion into a Profession with WiztecBD Training!",
        facilities: introFacilities,
    };

    return {
        id: course.id,
        title: course.title,
        description: course.description,
        img: course.image,
        price: course.price,
        status: course.course_type,
        apply_link: course.apply_link || null,
        facilities,
        introData,
        course_overview,
    };
};

const CourseDetailsPage = () => {
    const params = useParams();
    const routeParam = decodeURIComponent(params?.id || "");
    const isNumericRouteParam = /^\d+$/.test(routeParam);
    const { courses, loading: coursesLoading } = useCourses();

    const resolvedCourseId = useMemo(() => {
        if (!routeParam) return null;
        if (isNumericRouteParam) return Number(routeParam);
        return resolveCourseIdFromSlug(routeParam, courses);
    }, [routeParam, isNumericRouteParam, courses]);

    const { course, loading: courseLoading, error } = useCourse(resolvedCourseId);
    const loading = (isNumericRouteParam ? false : coursesLoading) || courseLoading;

    if (loading) {
        return (
            <RootSection>
                <Section id="courseLoading">
                    <div className="container mx-auto px-4 max-w-xl py-32 flex items-center justify-center">
                        <p className="text-H5 font-semibold text-black/50">Loading course...</p>
                    </div>
                </Section>
            </RootSection>
        );
    }

    if (error || !course) {
        return (
            <RootSection>
                <Section id="courseNotFound">
                    <div className="container mx-auto px-4 max-w-xl py-32 flex items-center justify-center">
                        <p className="text-H5 font-semibold text-black/50">Course not found!</p>
                    </div>
                </Section>
            </RootSection>
        );
    }

    const courseData = mapApiCourse(course, course.id);

    return (
        <RootSection>
            <Section id={"courseBanner"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Banner
                        alt="banner"
                        status={courseData.status}
                        subTitle={courseData.introData.sub_title}
                        title={courseData.title}
                        description={courseData.description}
                        img={courseData.img}
                    />
                </div>
            </Section>
            <Section id={"courseIntroDesign"} bgColor={"bg-white"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <IntroDesign
                        img={courseData.introData.img}
                        header={courseData.introData.header}
                        title={courseData.introData.title}
                        subheader={courseData.introData.sub_title}
                        facilities={courseData.introData.facilities}
                        buttonText={courseData.apply_link ? "Register Now" : null}
                        link={courseData.apply_link}
                    />
                </div>
            </Section>
            <Section id={"CourseOverview"} bgColor="#EEEEEE">
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <CourseOverview
                        courseID={courseData.id}
                        course_overview={courseData.course_overview}
                        facilities={courseData.facilities}
                        price={courseData.price}
                        status={courseData.status}
                        link={courseData.apply_link}
                        linkText={courseData.apply_link ? "Register Now" : null}
                    />
                </div>
            </Section>
        </RootSection>
    );
};

export default CourseDetailsPage;
