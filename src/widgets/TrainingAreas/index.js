"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiBarChart2, FiCheck, FiCloud, FiCode, FiCpu, FiMonitor, FiPenTool, FiSmartphone, FiZap } from "react-icons/fi";

import { trainingAreas } from "@/app/staticData/trainingAreas";

const areaIcons = {
    code: FiCode,
    mobile: FiSmartphone,
    cpu: FiCpu,
    analytics: FiBarChart2,
    automation: FiZap,
    cloud: FiCloud,
    creative: FiPenTool,
    literacy: FiMonitor,
};

const TrainingAreas = () => {
    const [activeAreaId, setActiveAreaId] = useState(trainingAreas[0].id);
    const activeArea = trainingAreas.find((area) => area.id === activeAreaId) ?? trainingAreas[0];
    const ActiveIcon = areaIcons[activeArea.icon];

    return (
        <div className="relative overflow-hidden bg-[#F2F7EC] py-16 text-primary md:py-24">
            <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-success_main/10 blur-3xl" />

            <div className="container relative mx-auto max-w-xl px-4">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-success_deep md:text-sm">
                        <span className="h-0.5 w-10 bg-success_main" /> Training Portfolio <span className="h-0.5 w-10 bg-success_main" />
                    </p>
                    <h2 className="mt-5 text-3xl font-extrabold leading-tight md:text-5xl">Explore Our <span className="text-success_deep">Training Areas</span></h2>
                    <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-gray500 md:text-base">Choose an area to explore the practical skills, technologies and program experience behind our training portfolio.</p>
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
                    <div className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:gap-2 lg:overflow-visible lg:pb-0" role="tablist" aria-label="Training areas">
                        {trainingAreas.map((area) => {
                            const Icon = areaIcons[area.icon];
                            const isActive = area.id === activeArea.id;

                            return (
                                <button
                                    key={area.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls="training-area-panel"
                                    onClick={() => setActiveAreaId(area.id)}
                                    className={`group flex min-w-64 items-center gap-4 rounded-2xl border px-4 py-4 text-left transition duration-300 lg:min-w-0 ${isActive ? "border-success_deep bg-success_deep text-white shadow-lg" : "border-success_main/15 bg-white/75 text-secondary hover:border-success_main/45 hover:bg-white"}`}
                                >
                                    <span className={`text-xs font-bold tracking-[0.15em] ${isActive ? "text-success_main" : "text-success_deep/45"}`}>{area.number}</span>
                                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isActive ? "bg-white/10 text-success_main" : "bg-success_light text-success_deep"}`}><Icon size={19} /></span>
                                    <span className="text-sm font-bold leading-5">{area.title}</span>
                                    {area.featured && <span className={`ml-auto hidden rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider sm:block ${isActive ? "bg-success_main text-primary" : "bg-success_light text-success_deep"}`}>4IR</span>}
                                </button>
                            );
                        })}
                    </div>

                    <div
                        id="training-area-panel"
                        key={activeArea.id}
                        role="tabpanel"
                        className={`training-area-panel relative min-h-[590px] overflow-hidden rounded-3xl border p-7 shadow-xl md:p-10 ${activeArea.featured ? "border-success_main/40 bg-[#215940] text-white" : "border-success_main/15 bg-white text-primary"}`}
                    >
                        <div className={`pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full blur-2xl ${activeArea.featured ? "bg-success_main/20" : "bg-success_light"}`} />
                        <div className="relative flex h-full flex-col">
                            <div className="flex items-start justify-between gap-5">
                                <span className={`flex h-16 w-16 items-center justify-center rounded-2xl ${activeArea.featured ? "bg-white/10 text-success_main" : "bg-success_light text-success_deep"}`}>
                                    <ActiveIcon size={29} />
                                </span>
                                <span className={`text-5xl font-black ${activeArea.featured ? "text-white/10" : "text-success_deep/10"}`}>{activeArea.number}</span>
                            </div>

                            <p className={`mt-8 text-xs font-bold uppercase tracking-[0.16em] ${activeArea.featured ? "text-success_main" : "text-success_deep"}`}>{activeArea.title}</p>
                            <h3 className={`mt-3 text-2xl font-extrabold leading-tight md:text-4xl ${activeArea.featured ? "text-white" : "text-primary"}`}>
                                {activeArea.headline ?? activeArea.title}
                            </h3>

                            <div className="mt-7 flex flex-wrap gap-2.5">
                                {activeArea.topics.map((topic) => (
                                    <span key={topic} className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold ${activeArea.featured ? "bg-white/10 text-white" : "bg-success_light text-secondary"}`}>
                                        <FiCheck className={activeArea.featured ? "text-success_main" : "text-success_deep"} /> {topic}
                                    </span>
                                ))}
                            </div>

                            <div className={`mt-8 border-l-2 pl-5 text-sm leading-7 md:text-base ${activeArea.featured ? "border-success_main text-white/80" : "border-success_main text-gray500"}`}>
                                {activeArea.evidence}
                            </div>

                            {activeArea.cta && (
                                <Link href="/courses" className={`mt-auto inline-flex w-fit items-center gap-3 pt-9 text-sm font-bold transition ${activeArea.featured ? "text-success_main hover:text-white" : "text-success_deep hover:text-success_main"}`}>
                                    {activeArea.cta} <FiArrowRight size={18} />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingAreas;
