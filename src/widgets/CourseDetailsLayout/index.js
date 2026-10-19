"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FiArrowDownRight } from "react-icons/fi";

import CourseTabs from "./CourseTabs";
import ApplicationSidebar from "./ApplicationSidebar";

const fallbackImage = "/assets/images/training images/multi_domain_curriculum_lab.png";

export default function CourseDetailsLayout({ course, loading = false }) {
    const applicationRef = useRef(null);
    const highlightRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(course?.image || fallbackImage);

    useEffect(() => {
        if (course?.image) {
            setImgSrc(course.image);
        }
    }, [course?.image]);

    const handleApplyClick = () => {
        const sidebar = applicationRef.current;
        if (!sidebar) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        sidebar.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
        sidebar.focus({ preventScroll: true });

        // Restart the border cue on every click without resetting the application form.
        highlightRef.current?.cancel();
        const glow = { borderColor: "#20804f", boxShadow: "0 0 0 4px rgba(32,128,79,0.16), 0 0 28px rgba(139,196,63,0.32)" };
        const resting = { borderColor: "#dfe5d9", boxShadow: "0 8px 32px rgba(0,0,0,0.04)" };
        highlightRef.current = sidebar.animate(reducedMotion ? [glow, glow] : [resting, glow, resting, glow, resting], {
            duration: 3000,
            easing: "ease-in-out",
        });
    };

    return (
        <main className="bg-[#f7f8fa] text-secondary">
            <section aria-labelledby="course-title" className="border-b border-[#e4e8e2] bg-[#f2f6ed]">
                <div className="container mx-auto grid max-w-xl items-center gap-6 px-6 py-8 md:grid-cols-[1.15fr_1fr] md:gap-10 md:py-10 lg:px-4">
                    <div>
                        <h1 id="course-title" className="max-w-[620px] text-[30px] font-bold leading-[1.18] tracking-[-0.025em] md:text-[38px] lg:text-[46px]">
                            {course?.title || "Course Details"}
                        </h1>
                        <button type="button" aria-controls="course-application" onClick={handleApplyClick} className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-success_deep px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-success_dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success_deep">
                            Apply now <FiArrowDownRight aria-hidden="true" size={18} />
                        </button>
                    </div>
                    <div className="relative h-[180px] overflow-hidden rounded-2xl bg-[#e3eadb] md:h-[220px]">
                        <Image
                            src={imgSrc || fallbackImage}
                            alt={course?.title ? `${course.title} course banner` : "Students learning together in a technology lab"}
                            fill
                            priority
                            unoptimized
                            onError={() => setImgSrc(fallbackImage)}
                            sizes="(min-width: 1200px) 480px, (min-width: 768px) 44vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <section aria-label="Course information and application" className="mx-auto grid w-full max-w-[1360px] items-start gap-6 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8 lg:py-10">
                <CourseTabs course={course} />
                <ApplicationSidebar course={course} sidebarRef={applicationRef} />
            </section>
        </main>
    );
}
