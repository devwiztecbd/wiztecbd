import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiBriefcase, FiFlag, FiUsers } from "react-icons/fi";

const partnershipModels = [
    {
        title: "Government Training Projects",
        description: "Technology and workforce-development initiatives.",
        icon: FiFlag,
        image: "/assets/images/partner images/ChatGPT Image Oct 4, 2026, 12_33_30 PM.png",
    },
    {
        title: "Institutional Training Programs",
        description: "Programs for universities, educational institutions and training organizations.",
        icon: FiBookOpen,
        image: "/assets/images/partner images/Smiling Students on Campus.png",
    },
    {
        title: "Corporate Upskilling",
        description: "Technology training tailored to organizational teams.",
        icon: FiBriefcase,
        image: "/assets/images/partner images/Collaborative Team Meeting in a Glass Office.png",
    },
    {
        title: "Youth & Employability Programs",
        description: "Large-scale digital-skills and employment-oriented training.",
        icon: FiUsers,
        image: "/assets/images/partner images/Celebrating Campus Friends Together.png",
    },
];

const TrainingPartnerships = () => (
    <div className="relative overflow-hidden bg-[#55594C] py-16 text-white md:py-24">
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-success_main/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-success_main/10 blur-3xl" />

        <div className="container relative mx-auto max-w-xl px-4">
            <div className="mx-auto max-w-3xl text-center">
                <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-success_main md:text-sm">
                    <span className="h-0.5 w-10 bg-success_main" /> Training Partnership Models <span className="h-0.5 w-10 bg-success_main" />
                </p>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white md:text-5xl">Partner With <span className="text-success_main">WiztecBD</span></h2>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {partnershipModels.map((model) => {
                    const Icon = model.icon;

                    return (
                        <article key={model.title} className="group relative flex min-h-[310px] flex-col justify-between overflow-hidden rounded-2xl border border-white/15 p-7 shadow-xl md:p-8">
                            <Image
                                src={model.image}
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover transition duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,30,23,.14)_0%,rgba(8,30,23,.36)_45%,rgba(8,30,23,.86)_100%)] transition-opacity duration-500 group-hover:opacity-90" />

                            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-success_main text-primary shadow-lg transition duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-success_deep">
                                <Icon size={22} />
                            </span>
                            <div className="relative z-10 mt-14">
                                <h3 className="text-lg font-extrabold leading-7 text-white [text-shadow:0_2px_12px_rgba(0,0,0,.5)]">{model.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,.7)]">{model.description}</p>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="mt-10 text-center">
                <Link href="#trainingInquiry" className="inline-flex items-center justify-center gap-3 rounded-xl bg-success_main px-7 py-4 text-sm font-bold text-primary transition hover:bg-white hover:text-success_deep md:text-base">
                    Discuss Your Training Requirement <FiArrowRight size={19} />
                </Link>
            </div>
        </div>
    </div>
);

export default TrainingPartnerships;
