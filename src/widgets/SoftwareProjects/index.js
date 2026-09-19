"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHandshake } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiBarChart2, FiBox, FiBriefcase, FiCheck, FiClock, FiLayers, FiPause, FiPlay, FiTarget } from "react-icons/fi";

import { softwareProjects } from "@/app/staticData/softwareProjects";

const AUTOPLAY_DELAY = 6500;

const impactItems = [
    { title: "Industry-Specific Solutions", text: "Tailored to your domain and workflow", icon: FiTarget },
    { title: "Scalable Architecture", text: "Built to grow with your business", icon: FiBarChart2 },
    { title: "Custom & Ready-Made Products", text: "Flexible solutions for every need", icon: FiBox },
    { title: "Built for Real Operations", text: "Proven in live business environments", icon: FaHandshake },
];

const getSlideState = (index, activeIndex, slideCount) => {
    if (index === activeIndex) return "active";
    if (index === (activeIndex - 1 + slideCount) % slideCount) return "previous";
    if (index === (activeIndex + 1) % slideCount) return "next";
    return "hidden";
};

const ProjectPreview = ({ project, number }) => (
    <div className="training-project-preview flex h-full flex-col overflow-hidden rounded-2xl border border-white/80 bg-white shadow-xl">
        <div className="p-5">
            <span className="flex items-center gap-3 text-lg font-bold text-success_deep">{String(number).padStart(2, "0")} <span className="h-px w-10 bg-success_main" /></span>
            <h3 className="mt-5 text-lg font-bold leading-6 text-primary">{project.title}</h3>
            <p className="mt-2 text-xs leading-5 text-gray500">{project.subtitle}</p>
            <div className="mt-5 space-y-3 text-xs text-gray500">
                <p className="flex items-start gap-2"><FiBriefcase className="mt-0.5 shrink-0 text-success_deep" /> {project.industry}</p>
                <p className="flex items-start gap-2"><FiLayers className="mt-0.5 shrink-0 text-success_deep" /> {project.solutionType}</p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-divider pt-4">
                {project.stats.slice(0, 2).map((stat) => <p key={stat.label}><strong className="block text-lg text-success_deep">{stat.value}</strong><span className="text-[10px] leading-4 text-gray500">{stat.label}</span></p>)}
            </div>
        </div>
        <div className="relative mt-auto h-40">
            <Image src={project.image} alt={`${project.title} preview`} fill sizes="260px" unoptimized className="object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-white/35" />
        </div>
    </div>
);

const ProjectDetail = ({ project, number }) => {
    const metricIcons = [FiBox, FiClock, FiBarChart2];

    return (
        <article className="training-project-detail grid overflow-hidden rounded-2xl border border-white/80 bg-white shadow-xl lg:h-[580px] lg:grid-cols-[1.55fr_1fr]">
            <div className="flex flex-col p-6 md:p-8">
                <div className="flex items-start justify-between gap-5">
                    <div>
                        <span className="flex items-center gap-3 text-2xl font-bold text-success_deep">{String(number).padStart(2, "0")} <span className="h-px w-12 bg-success_main" /></span>
                        <h3 className="mt-3 text-2xl font-extrabold leading-tight text-primary md:text-3xl">{project.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-gray500 md:text-base">{project.subtitle}</p>
                    </div>
                    <div className="hidden max-w-44 items-center gap-3 text-xs font-semibold leading-5 text-secondary sm:flex">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-success_light text-success_deep"><FiBriefcase size={20} /></span>
                        <span>{project.industry}<small className="mt-1 block font-normal text-gray500">{project.solutionType}</small></span>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-divider border-b border-divider pb-5">
                    {project.stats.map((stat, index) => {
                        const Icon = metricIcons[index];
                        return (
                            <div key={stat.label} className={`flex items-center gap-2 ${index === 0 ? "pr-3" : index === 2 ? "pl-3" : "px-3"}`}>
                                <Icon className="shrink-0 text-success_deep" size={21} />
                                <span><strong className="block text-lg text-primary">{stat.value}</strong><span className="text-[10px] leading-4 text-gray500">{stat.label}</span></span>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-5">
                    <p className="flex items-center gap-2 text-sm font-bold text-primary"><FiLayers className="text-success_deep" /> Core Features</p>
                    <ul className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                        {project.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-xs leading-5 text-secondary"><FiCheck className="mt-1 shrink-0 rounded-full bg-success_deep p-0.5 text-white" /> {feature}</li>)}
                    </ul>
                </div>

                <blockquote className="mt-5 rounded-xl bg-success_light px-5 py-3 text-xs leading-5 text-secondary">“{project.quote}”</blockquote>
                <Link href={`/portfolio/${project.id}`} className="mt-5 inline-flex w-fit items-center gap-3 rounded-lg bg-success_deep px-5 py-3 text-sm font-semibold text-white transition hover:bg-success_main">View Project Details <FiArrowRight /></Link>
            </div>

            <div className="relative min-h-72 overflow-hidden bg-[#eef5e8] lg:min-h-0">
                <Image src={project.image} alt={`${project.title} interface`} fill sizes="(min-width: 1024px) 380px, 100vw" unoptimized className="object-contain p-4" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-6 pb-7 pt-20 text-right text-xl font-medium italic text-white">Smarter Systems. Stronger Business.</div>
            </div>
        </article>
    );
};

const SoftwareProjects = () => {
    const [activeIndex, setActiveIndex] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef(null);

    const goToSlide = (index) => setActiveIndex((index + softwareProjects.length) % softwareProjects.length);
    const showPrevious = () => goToSlide(activeIndex - 1);
    const showNext = () => goToSlide(activeIndex + 1);

    useEffect(() => {
        if (isPaused) return undefined;
        const timer = window.setTimeout(() => setActiveIndex((current) => (current + 1) % softwareProjects.length), AUTOPLAY_DELAY);
        return () => window.clearTimeout(timer);
    }, [activeIndex, isPaused]);

    const handleTouchEnd = (event) => {
        if (touchStartX.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(distance) > 45) distance > 0 ? showPrevious() : showNext();
        touchStartX.current = null;
    };

    return (
        <div className="software-projects-section overflow-hidden bg-[#F8F9FB] py-14 text-primary md:py-20">
            <div className="container relative mx-auto max-w-2xl px-4 text-center">
                <Image src="/assets/images/Logos/logo.png" alt="WiztecBD" width={150} height={45} className="absolute right-4 top-0 hidden h-auto w-36 xl:block" />
                <p className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.16em] text-success_deep md:text-sm"><span className="h-0.5 w-10 bg-success_main" /> Our Software Projects <span className="h-0.5 w-10 bg-success_main" /></p>
                <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">Smart Software. <span className="text-success_deep">Real Business Impact.</span></h2>
                <p className="mx-auto mt-3 max-w-4xl text-sm leading-6 text-gray500 md:text-base">We design and deliver custom platforms, ERP systems, business applications and digital products across industries to help organizations work smarter, grow faster and create lasting value.</p>
                <Link href="/portfolio" className="mt-5 inline-flex items-center gap-3 rounded-full border border-success_deep px-5 py-2.5 text-sm font-semibold text-success_deep transition hover:bg-success_deep hover:text-white lg:absolute lg:right-4 lg:top-20 lg:mt-0">View All Projects <FiArrowRight /></Link>
            </div>

            <div className="training-projects-stage relative mt-10 outline-none" role="region" aria-label="Software projects carousel" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft") showPrevious(); if (event.key === "ArrowRight") showNext(); }} onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }} onTouchEnd={handleTouchEnd}>
                {softwareProjects.map((project, index) => {
                    const state = getSlideState(index, activeIndex, softwareProjects.length);
                    return (
                        <div key={project.id} className={`training-project-slide training-project-slide--${state}`} aria-hidden={state !== "active"}>
                            <ProjectDetail project={project} number={index + 1} />
                            <ProjectPreview project={project} number={index + 1} />
                        </div>
                    );
                })}
                <button type="button" onClick={showPrevious} aria-label="Previous software project" className="training-project-arrow training-project-arrow--left"><FiArrowLeft /></button>
                <button type="button" onClick={showNext} aria-label="Next software project" className="training-project-arrow training-project-arrow--right"><FiArrowRight /></button>
            </div>

            <div className="mt-7 flex items-center justify-center gap-3">
                {softwareProjects.map((project, index) => <button key={project.id} type="button" onClick={() => goToSlide(index)} aria-label={`Show ${project.title}`} aria-current={index === activeIndex ? "true" : undefined} className={`h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? "w-16 bg-success_deep" : "w-12 bg-[#DDE3E7] hover:bg-success_main/50"}`} />)}
                <button type="button" onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? "Resume carousel" : "Pause carousel"} className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-success_deep text-success_deep transition hover:bg-success_deep hover:text-white">{isPaused ? <FiPlay size={14} /> : <FiPause size={14} />}</button>
            </div>

            <div className="container mx-auto mt-10 grid max-w-2xl gap-5 px-4 sm:grid-cols-2 lg:grid-cols-4">
                {impactItems.map((item) => {
                    const Icon = item.icon;
                    return <div key={item.title} className="flex items-center gap-4"><Icon className="shrink-0 text-success_deep" size={32} /><p><strong className="block text-xs text-secondary">{item.title}</strong><span className="mt-1 block text-[11px] leading-4 text-gray500">{item.text}</span></p></div>;
                })}
            </div>
        </div>
    );
};

export default SoftwareProjects;
