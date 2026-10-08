"use client";

import { useState } from "react";
import { FiBookOpen, FiChevronDown } from "react-icons/fi";

// Demo modules for the curriculum design; replace with course content later.
const modules = [
    {
        id: "introduction",
        title: "Getting started with Power BI",
        description: "Explore the role of a data analyst, get familiar with Power BI Desktop, and learn how business questions become useful reports.",
    },
    {
        id: "data-preparation",
        title: "Connecting and preparing your data",
        description: "Import data from common sources and use Power Query to clean, combine, and organize it before you begin your analysis.",
    },
    {
        id: "data-modeling",
        title: "Building a reliable data model",
        description: "Learn how tables work together. Create relationships and a simple star schema that makes your reports easier to understand and maintain.",
    },
    {
        id: "dax",
        title: "DAX measures and calculations",
        description: "Create measures for everyday business questions. Practice totals, percentages, and time comparisons while learning how filter context affects your results.",
    },
    {
        id: "dashboards",
        title: "Designing dashboards that tell a story",
        description: "Choose clear visuals, add useful filters, and arrange your dashboard so people can quickly find the insights that matter to them.",
    },
    {
        id: "ai-analysis",
        title: "Using AI in your analysis workflow",
        description: "Explore ways AI can support your analysis, help explain calculations, and suggest insights. Learn to check its outputs against your actual data.",
    },
    {
        id: "practical-project",
        title: "Working on a practical business project",
        description: "Bring your skills together with a sample business dataset. Build a report, identify key findings, and present your recommendations in a simple walkthrough.",
    },
    {
        id: "publishing",
        title: "Publishing reports and preparing for PL-300",
        description: "Get an introduction to sharing reports in Power BI Service and review the main skill areas covered by the PL-300 certification exam.",
    },
];

function CurriculumModule({ module, index, isOpen, onToggle }) {
    const triggerId = `curriculum-trigger-${module.id}`;
    const panelId = `curriculum-content-${module.id}`;

    return (
        <div className={`overflow-hidden rounded-xl border bg-white transition-colors duration-300 motion-reduce:transition-none ${isOpen ? "border-success_deep/30" : "border-[#e2e7df]"}`}>
            <h3>
                <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={onToggle}
                    className={`flex w-full items-center gap-3 px-4 py-4 text-left transition-colors duration-300 hover:bg-[#f7f9f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-success_deep motion-reduce:transition-none md:gap-4 md:px-5 ${isOpen ? "bg-[#f2f6ed]" : "bg-white"}`}
                >
                    <span aria-hidden="true" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition-colors duration-300 motion-reduce:transition-none ${isOpen ? "border-success_deep/15 bg-white text-success_deep" : "border-[#e2e7df] bg-[#f7f8fa] text-gray700"}`}>{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-sm font-semibold leading-relaxed text-secondary md:text-[15px]">{module.title}</span>
                    <FiChevronDown aria-hidden="true" size={18} className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-180 text-success_deep" : "text-gray700"}`} />
                </button>
            </h3>
            {/* Keep the content mounted so its natural height animates in both directions.
                Closed panels are inert and hidden from assistive technology. */}
            <div
                id={panelId}
                aria-labelledby={triggerId}
                aria-hidden={!isOpen}
                inert={isOpen ? undefined : ""}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-[#e2e7df] px-4 py-5 md:pl-[76px] md:pr-6">
                        <p className="text-sm leading-7 text-gray700">{module.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CurriculumAccordion() {
    const [openModuleId, setOpenModuleId] = useState(modules[0].id);

    return (
        <section aria-labelledby="curriculum-heading">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 id="curriculum-heading" className="text-[22px] font-bold tracking-[-0.025em] text-primary md:text-[26px]">Course curriculum</h2>
                    <p className="mt-2 max-w-[580px] text-sm leading-relaxed text-gray700">A step-by-step path from the fundamentals to your first business dashboard.</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f2f6ed] px-3 py-2 text-xs font-semibold text-success_deep">
                    <FiBookOpen aria-hidden="true" size={14} /> {modules.length} modules
                </span>
            </div>

            <div className="space-y-3">
                {modules.map((module, index) => (
                    <CurriculumModule
                        key={module.id}
                        module={module}
                        index={index}
                        isOpen={openModuleId === module.id}
                        onToggle={() => setOpenModuleId((previous) => previous === module.id ? null : module.id)}
                    />
                ))}
            </div>
        </section>
    );
}
