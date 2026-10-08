"use client";

import Image from "next/image";

import CourseTabs from "./CourseTabs";
import ApplicationSidebar from "./ApplicationSidebar";

export default function CourseDetailsLayout({ course }) {
    return (
        <main className="bg-[#f7f8fa] text-secondary">
            <section aria-labelledby="course-title" className="border-b border-[#e4e8e2] bg-[#f2f6ed]">
                <div className="container mx-auto grid max-w-xl items-center gap-6 px-6 py-8 md:grid-cols-[1.15fr_1fr] md:gap-10 md:py-10 lg:px-4">
                    <h1 id="course-title" className="max-w-[620px] text-[30px] font-bold leading-[1.18] tracking-[-0.035em] md:text-[38px] lg:text-[46px]">
                        {course.title}
                    </h1>
                    <div className="relative h-[180px] overflow-hidden rounded-2xl bg-[#e3eadb] md:h-[220px]">
                        <Image
                            src={course.image}
                            alt="Students learning together in a technology lab"
                            fill
                            priority
                            sizes="(min-width: 1200px) 480px, (min-width: 768px) 44vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <section aria-label="Course information and application" className="mx-auto grid w-full max-w-[1360px] items-start gap-6 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8 lg:py-10">
                <CourseTabs />
                <ApplicationSidebar course={course} />
            </section>
        </main>
    );
}
