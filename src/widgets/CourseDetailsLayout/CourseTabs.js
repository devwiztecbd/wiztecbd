"use client";

import { useRef, useState } from "react";
import CurriculumAccordion from "./CurriculumAccordion";
import SoftwareGrid from "./SoftwareGrid";
import AudienceGrid from "./AudienceGrid";
import BenefitsList from "./BenefitsList";
import ProjectsList from "./ProjectsList";
import JobPositionsGrid from "./JobPositionsGrid";
import CourseModeDetails from "./CourseModeDetails";

const tabs = [
    { id: "overview", label: "Overview" },
    { id: "course-details", label: "Course Details" },
    { id: "curriculum", label: "Curriculum" },
    { id: "software", label: "Software" },
    { id: "for-whom", label: "For Whom" },
    { id: "benefits", label: "Benefits" },
    { id: "projects", label: "Projects" },
    { id: "open-job-position", label: "Open Job Position" },
];

export default function CourseTabs({ course }) {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const tabRefs = useRef([]);

    // Keep keyboard focus and the selected panel in sync using standard tab keys.
    const handleKeyDown = (event, index) => {
        let nextIndex;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = tabs.length - 1;
        else return;

        event.preventDefault();
        setActiveTab(tabs[nextIndex].id);
        tabRefs.current[nextIndex]?.focus();
    };

    return (
        <div className="min-w-0 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.025)]">
            <div role="tablist" aria-label="Explore this course" className="flex flex-wrap gap-x-1 border-b border-[#e5e7eb] px-3 pt-2 md:px-4">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.id}
                        ref={(element) => { tabRefs.current[index] = element; }}
                        id={`course-tab-${tab.id}`}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        aria-controls={`course-panel-${tab.id}`}
                        tabIndex={activeTab === tab.id ? 0 : -1}
                        onClick={() => setActiveTab(tab.id)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        className={`border-b-2 px-3 py-4 text-[12px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-success_deep ${activeTab === tab.id ? "border-success_deep text-success_deep" : "border-transparent text-gray700 hover:border-success_main/40 hover:text-primary"}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Each panel owns its content so new sections can be added independently. */}
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    id={`course-panel-${tab.id}`}
                    role="tabpanel"
                    aria-labelledby={`course-tab-${tab.id}`}
                    hidden={activeTab !== tab.id}
                    tabIndex={0}
                    className="min-h-[280px] rounded-b-2xl p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-success_deep lg:min-h-[480px]"
                >
                    {tab.id === "overview" && (
                        <section aria-labelledby="course-overview-heading">
                            <h2 id="course-overview-heading" className="text-[22px] font-bold tracking-[-0.025em] text-primary md:text-[26px]">Course Overview</h2>
                            <div className="mt-4 max-w-[760px] whitespace-pre-line text-sm leading-relaxed text-gray700">
                                {course?.overview || course?.description || course?.overview_description || "AI-Powered Power BI Data Analyst is an intensive, practical data analytics program designed to prepare learners to transform raw business data into meaningful insights using Microsoft Power BI."}
                            </div>
                        </section>
                    )}
                    {tab.id === "curriculum" && <CurriculumAccordion curriculums={course?.curriculumsData || course?.course_curriculum} />}
                    {tab.id === "software" && <SoftwareGrid softwares={course?.softwaresData || course?.softwares_included} />}
                    {tab.id === "for-whom" && <AudienceGrid audiences={course?.forWhomsData || course?.designed_for} />}
                    {tab.id === "benefits" && <BenefitsList benefits={course?.benefitsData} />}
                    {tab.id === "projects" && <ProjectsList projects={course?.projectsData} />}
                    {tab.id === "open-job-position" && <JobPositionsGrid positions={course?.positionsData || course?.career_opportunities || course?.open_job_positions} />}
                    {tab.id === "course-details" && <CourseModeDetails options={course?.enrollmentOptions} />}
                </div>
            ))}
        </div>
    );
}
