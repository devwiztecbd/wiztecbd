"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

import { featuredTrainingPortfolio } from "@/app/staticData/featuredTrainingPortfolio";

const PortfolioLogo = ({ logo }) => {
    return (
        <span className="relative h-14 w-32">
            <Image src={logo.src} alt={logo.alt} fill sizes="128px" className="object-contain" />
        </span>
    );
};

const FeaturedTrainingPortfolio = () => {
    return (
        <div className="relative overflow-hidden bg-[#F8F9FB] py-16 text-primary md:py-24">
            <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-success_main/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-success_deep/10 blur-3xl" />

            <div className="relative">
                <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-0 h-1 -translate-y-1/2 bg-[#DDE2DE]" />
                <Marquee autoFill speed={28} className="relative z-10">
                    <div className="flex h-[590px] items-stretch">
                        {featuredTrainingPortfolio.map((project, index) => {
                            const isAbove = index % 2 === 1;

                            return (
                                <article key={project.id} className="relative w-[340px] shrink-0 px-5 sm:w-[420px] lg:w-[470px]">
                                    <div className="absolute left-1/2 top-1/2 z-20 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-[#F8F9FB] bg-success_deep shadow-lg" />

                                    <div className={`absolute left-5 right-5 ${isAbove ? "top-0" : "bottom-0"}`}>
                                        <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-black/5 bg-white px-7 py-7 text-center shadow-[0_18px_45px_rgba(0,0,0,.10)]">
                                            <h3 className="text-lg font-extrabold leading-6 text-primary md:text-xl">{project.title}</h3>
                                            <p className="mt-3 text-sm leading-5 text-gray500">{project.organization}</p>
                                            <div className="mt-6 flex min-h-14 flex-wrap items-center justify-center gap-4">
                                                {project.logos.map((logo) => <PortfolioLogo key={logo.src} logo={logo} />)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`absolute left-1/2 z-30 w-56 -translate-x-1/2 rounded-lg bg-[linear-gradient(90deg,#8BC43F_0%,#20804F_100%)] px-5 py-2 text-center text-lg font-extrabold leading-none text-white shadow-md ${isAbove ? "top-[calc(50%+3rem)]" : "bottom-[calc(50%+3rem)]"}`}>
                                        <span className="relative">{project.year}</span>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

export default FeaturedTrainingPortfolio;
