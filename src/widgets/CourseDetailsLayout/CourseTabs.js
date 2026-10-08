"use client";

import { useRef, useState } from "react";
import CurriculumAccordion from "./CurriculumAccordion";
import SoftwareGrid from "./SoftwareGrid";
import AudienceGrid from "./AudienceGrid";
import BenefitsList from "./BenefitsList";
import ProjectsList from "./ProjectsList";
import JobPositionsGrid from "./JobPositionsGrid";

const tabs = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "software", label: "Software" },
    { id: "for-whom", label: "For Whom" },
    { id: "benefits", label: "Benefits" },
    { id: "projects", label: "Projects" },
    { id: "open-job-position", label: "Open Job Position" },
];

export default function CourseTabs() {
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
                    {tab.id === "curriculum" && <CurriculumAccordion />}
                    {tab.id === "software" && <SoftwareGrid />}
                    {tab.id === "for-whom" && <AudienceGrid />}
                    {tab.id === "benefits" && <BenefitsList />}
                    {tab.id === "projects" && <ProjectsList />}
                    {tab.id === "open-job-position" && <JobPositionsGrid />}
                </div>
            ))}
        </div>
    );
}
