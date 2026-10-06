"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiBarChart2, FiBookOpen, FiBriefcase, FiCheckCircle, FiExternalLink, FiShield, FiShoppingBag } from "react-icons/fi";

import Select from "@/components/Select";
import Slider from "@/components/Slider";
import { portfolioProjects } from "@/app/staticData/portfolioShowcase";

const createFilterOptions = (values, allLabel) => [
    { label: allLabel, value: "" },
    ...[...new Set(values)].map((value) => ({ label: value, value })),
];

const technologyOptions = createFilterOptions(portfolioProjects.flatMap((project) => project.technologies), "All tech stacks");
const industryOptions = createFilterOptions(portfolioProjects.flatMap((project) => project.industries), "All industries");
const categoryOptions = createFilterOptions(portfolioProjects.map((project) => project.category), "All project categories");

const projectIcons = {
    "1": FiShield,
    "2": FiShoppingBag,
    "3": FiBookOpen,
    "4": FiBriefcase,
};

const PortfolioShowcase = () => {
    const [activeProject, setActiveProject] = useState(0);
    const [technologyFilter, setTechnologyFilter] = useState("");
    const [industryFilter, setIndustryFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const heroRef = useRef(null);

    const filteredProjects = portfolioProjects.filter((project) => {
        const matchesTechnology = !technologyFilter || project.technologies.includes(technologyFilter);
        const matchesIndustry = !industryFilter || project.industries.includes(industryFilter);
        const matchesCategory = !categoryFilter || project.category === categoryFilter;

        return matchesTechnology && matchesIndustry && matchesCategory;
    });

    const handleProjectSelect = (index) => {
        setActiveProject(index);
        heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section className="relative overflow-hidden bg-[#f7fbf5] px-4 py-8 md:py-12" aria-label="Featured portfolio projects">
            <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(139,196,63,.42) 1.5px, transparent 1.5px)",
                    backgroundSize: "54px 54px",
                }}
            />
            <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-success_light blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-success_light blur-3xl" />

            <div className="container relative mx-auto max-w-2xl">
                <div ref={heroRef} className="scroll-mt-[120px]">
                    <Slider
                        autoplayDelay={14000}
                        activeIndex={activeProject}
                        onSlideChange={setActiveProject}
                        pauseOnHover
                        viewportClassName="rounded-20 border border-success_main/20 bg-white/90 shadow-xxl backdrop-blur-sm"
                        slideClassName="min-h-[620px]"
                        navigationClassName="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-success_dark shadow-md transition hover:border-success_main hover:text-success_main md:h-12 md:w-12"
                        paginationClassName="bottom-5 md:bottom-7"
                    >
                        {portfolioProjects.map((project) => (
                            <article key={project.id} className="grid min-h-[620px] grid-cols-1 items-center gap-8 px-6 pb-20 pt-10 md:px-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-20 lg:pb-16">
                                <div className="relative z-10">
                                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-success_light px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-success_deep">
                                        <span className="h-2 w-2 rounded-full bg-success_main" />
                                        {project.eyebrow}
                                    </div>

                                    <h1 className="mb-2 text-4xl font-extrabold leading-none tracking-tight text-primary md:text-5xl 2xl:text-6xl">{project.title}</h1>
                                    <h2 className="mb-4 text-lg font-bold text-secondary md:text-2xl">{project.subtitle}</h2>
                                    <p className="max-w-2xl text-sm leading-7 text-gray500 md:text-base">{project.description}</p>

                                    <div className="mt-6 space-y-5">
                                        <div>
                                            <p className="mb-2.5 flex items-center gap-2 font-bold text-secondary">
                                                <FiCheckCircle className="text-success_main" /> Tech stack
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((technology) => (
                                                    <span key={technology} className="rounded-full bg-secondary_bg px-3 py-1.5 text-xs font-medium text-secondary">
                                                        {technology}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="mb-2.5 flex items-center gap-2 font-bold text-secondary">
                                                <FiCheckCircle className="text-success_main" /> Industry covered
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.industries.map((industry) => (
                                                    <span key={industry} className="rounded-full bg-success_light px-3 py-1.5 text-xs font-medium text-success_deep">
                                                        {industry}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <p className="mb-3 flex items-center gap-2 font-bold text-secondary">
                                            <FiBarChart2 className="text-success_main" /> Project overview
                                        </p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {project.stats.map((stat) => (
                                                <div key={stat.label} className="rounded-lg bg-success_light px-2 py-2.5">
                                                    <p className="text-lg font-extrabold leading-none text-success_deep md:text-xl">{stat.value}</p>
                                                    <p className="mt-1 text-[10px] leading-tight text-gray500 md:text-xs">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-success_main px-6 py-3 font-semibold text-white shadow-md transition hover:bg-success_dark">
                                            Start a project <FiArrowRight />
                                        </Link>
                                        <Link href={project.detailsHref} className="inline-flex items-center gap-2 rounded-full border border-success_main/50 bg-white px-6 py-3 font-semibold text-success_deep transition hover:border-success_main hover:bg-success_light">
                                            View case study <FiExternalLink />
                                        </Link>
                                    </div>
                                </div>

                                <div className="relative flex min-h-[300px] items-center justify-center lg:min-h-[480px]">
                                    <div className="absolute inset-x-4 top-1/2 h-72 -translate-y-1/2 rounded-[50%] bg-gradient-to-br from-success_light via-white to-success_main/20 blur-sm" />
                                    <div className="absolute right-0 top-6 z-10 rounded-full border border-success_main/20 bg-white/95 px-4 py-3 text-xs font-semibold text-success_deep shadow-md md:text-sm">{project.badge}</div>
                                    <div className="relative h-[280px] w-full md:h-[420px]">
                                        <Image src={project.image} alt={project.imageAlt} fill priority={project.id === portfolioProjects[0].id} sizes="(min-width: 1024px) 48vw, 90vw" className="object-contain drop-shadow-2xl" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </Slider>
                </div>

                <div className="mt-10 md:mt-14">
                    <div className="mb-6 text-center">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-success_deep">Our portfolio</p>
                        <h2 className="text-2xl font-bold text-primary md:text-3xl">Explore our work</h2>
                    </div>

                    <div className="mb-7 grid gap-4 rounded-xl bg-white/80 p-4 shadow-lg md:grid-cols-3 md:p-5">
                        <div>
                            <label className="mb-2 block text-xs font-semibold text-secondary">Tech stack</label>
                            <Select value={technologyFilter} multipleValu={false} onChange={setTechnologyFilter} options={technologyOptions} placeholder="Filter by tech stack" inputClass="flex h-11 w-full cursor-pointer items-center rounded-lg border border-divider bg-white px-4 transition hover:border-success_main focus:border-success_main focus:outline-none" />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-semibold text-secondary">Industry</label>
                            <Select value={industryFilter} multipleValu={false} onChange={setIndustryFilter} options={industryOptions} placeholder="Filter by industry" inputClass="flex h-11 w-full cursor-pointer items-center rounded-lg border border-divider bg-white px-4 transition hover:border-success_main focus:border-success_main focus:outline-none" />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-semibold text-secondary">Project category</label>
                            <Select value={categoryFilter} multipleValu={false} onChange={setCategoryFilter} options={categoryOptions} placeholder="Filter by project category" inputClass="flex h-11 w-full cursor-pointer items-center rounded-lg border border-divider bg-white px-4 transition hover:border-success_main focus:border-success_main focus:outline-none" />
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {filteredProjects.map((project) => {
                            const projectIndex = portfolioProjects.findIndex((item) => item.id === project.id);
                            const ProjectIcon = projectIcons[project.id] ?? FiBriefcase;

                            return (
                                <article key={project.id} className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-success_main/15 bg-white text-center shadow-lg transition duration-300 hover:-translate-y-1.5 hover:border-success_main/40 hover:shadow-xl">
                                    <button type="button" onClick={() => handleProjectSelect(projectIndex)} aria-pressed={activeProject === projectIndex} aria-label={`Show ${project.title} in the featured slider`} className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-success_main" />
                                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-success_light via-white to-success_main/10">
                                        <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/15 to-transparent" />
                                    </div>

                                    <div className="relative flex flex-1 flex-col items-center px-5 pb-7 pt-12">
                                        <div className="absolute -top-9 flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-white bg-white text-success_deep shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:bg-success_main group-hover:text-white">
                                            <ProjectIcon aria-hidden="true" className="text-3xl" />
                                        </div>
                                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-success_deep">{project.category}</p>
                                        <h3 className="text-lg font-bold leading-snug text-primary md:text-xl">{project.title}</h3>
                                        <p className="mt-3 line-clamp-4 text-sm leading-6 text-gray500">{project.description}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                    {filteredProjects.length === 0 && <p className="py-10 text-center text-sm text-gray500">No projects match the selected filters.</p>}
                </div>
            </div>
        </section>
    );
};

export default PortfolioShowcase;
