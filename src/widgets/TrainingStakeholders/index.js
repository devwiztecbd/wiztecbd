"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const stakeholders = [
    {
        name: "ICT Division",
        logo: "/assets/images/client/44.webp",
    },
    {
        name: "Bangladesh Computer Council",
        logo: "/assets/images/client/46.webp",
    },
    {
        name: "National Skills Development Authority",
        logo: "/assets/images/nsda-logo.png",
    },
    {
        name: "Bangladesh Association of Software and Information Services",
        logo: "/assets/images/basis.png",
    },
    {
        name: "Institute of Information Technology, University of Dhaka",
        logo: "/assets/images/client/32.webp",
    },
    {
        name: "National Youth Development Training Academy",
        logo: "/assets/images/client/19.webp",
    },
];

const TrainingStakeholders = () => (
    <div className="relative overflow-hidden bg-[#55594C] py-16 md:py-24">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-success_main/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-success_main/10 blur-3xl" />

        <div className="container relative mx-auto max-w-xl px-4 text-center">
            <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-success_main md:text-sm">
                <span className="h-0.5 w-10 bg-success_main" /> Trusted Collaboration <span className="h-0.5 w-10 bg-success_main" />
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-white md:text-5xl">Training Stakeholders</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
                Institutions and industry bodies connected to our training and workforce-development ecosystem.
            </p>
        </div>

        <div
            className="relative mx-auto mt-10 max-w-[1600px] overflow-hidden md:mt-12"
            aria-label="Training stakeholder logos"
            style={{
                maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
        >
            <Marquee autoFill speed={34} pauseOnHover>
                {stakeholders.map((stakeholder) => (
                    <div key={stakeholder.name} className="group mx-2 flex h-44 w-64 flex-col items-center justify-center rounded-2xl border border-white/25 bg-white px-6 py-5 shadow-xl transition duration-300 hover:-translate-y-1 md:mx-3 md:h-48 md:w-72">
                        <div className="relative h-24 w-full">
                            <Image
                                src={stakeholder.logo}
                                alt={`${stakeholder.name} logo`}
                                fill
                                sizes="288px"
                                className="object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <p className="mt-4 min-h-10 text-center text-sm font-bold leading-5 text-secondary">{stakeholder.name}</p>
                    </div>
                ))}
            </Marquee>
        </div>
    </div>
);

export default TrainingStakeholders;
