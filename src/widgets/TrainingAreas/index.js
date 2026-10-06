import Link from "next/link";
import { FiBarChart2, FiCheck, FiCloud, FiCode, FiCpu, FiMonitor, FiPenTool, FiSmartphone, FiZap } from "react-icons/fi";

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

const TrainingAreas = () => (
    <div className="relative isolate overflow-hidden bg-[#F2F7EC] py-16 text-primary md:py-24">
        <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-success_main/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-success_main/10 blur-3xl" />

        <div className="container relative mx-auto max-w-xl px-4">
            <div className="mx-auto max-w-4xl text-center">
                <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-success_deep md:text-sm">
                    <span className="h-0.5 w-10 bg-success_main" /> Training Portfolio <span className="h-0.5 w-10 bg-success_main" />
                </p>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight md:text-5xl">Explore Our <span className="text-success_deep">Training Areas</span></h2>
                <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-gray500 md:text-base">Explore practical, industry-aligned programs across software, emerging technology, digital skills and professional development.</p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {trainingAreas.map((area) => {
                    const Icon = areaIcons[area.icon];

                    return (
                        <Link
                            key={area.id}
                            href={area.href}
                            aria-label={`Explore ${area.title}`}
                            className={`group relative flex min-h-full flex-col overflow-hidden rounded-2xl border bg-white p-5 shadow-xl transition duration-500 hover:-translate-y-1.5 hover:border-success_main hover:shadow-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success_deep focus-visible:ring-offset-4 md:p-6 ${area.featured ? "border-success_main" : "border-divider"}`}
                        >
                            <div className="relative z-10 flex items-start gap-4">
                                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-success_light text-success_deep transition duration-500 group-hover:scale-105 group-hover:bg-success_main group-hover:text-primary">
                                    <Icon size={25} />
                                </span>
                                <div className="min-w-0 pt-0.5">
                                    <span className="block text-sm font-extrabold leading-none text-success_deep">{area.number}</span>
                                    <h3 className="mt-1 text-sm font-extrabold leading-[1.2] text-primary md:text-base">{area.title}</h3>
                                </div>
                            </div>

                            <p className="relative z-10 mt-4 min-h-10 text-xs font-medium leading-5 text-gray500 md:text-sm">{area.headline}</p>

                            <div className="relative z-10 mt-4 space-y-1.5">
                                {area.topics.map((topic) => (
                                    <div key={topic} className="flex items-start gap-2 text-[11px] leading-4 text-gray500 md:text-xs">
                                        <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success_deep text-white transition-colors duration-300 group-hover:bg-success_main group-hover:text-primary">
                                            <FiCheck size={10} strokeWidth={3} />
                                        </span>
                                        <span>{topic}</span>
                                    </div>
                                ))}
                            </div>

                            {area.featured && <span className="relative z-10 mt-auto pt-5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-success_deep">Featured 4IR Area</span>}
                        </Link>
                    );
                })}
            </div>
        </div>
    </div>
);

export default TrainingAreas;
