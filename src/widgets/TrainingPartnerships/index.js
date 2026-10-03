import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiBriefcase, FiFlag, FiUsers } from "react-icons/fi";

const partnershipModels = [
    {
        title: "Government Training Projects",
        description: "Technology and workforce-development initiatives.",
        icon: FiFlag,
    },
    {
        title: "Institutional Training Programs",
        description: "Programs for universities, educational institutions and training organizations.",
        icon: FiBookOpen,
    },
    {
        title: "Corporate Upskilling",
        description: "Technology training tailored to organizational teams.",
        icon: FiBriefcase,
    },
    {
        title: "Youth & Employability Programs",
        description: "Large-scale digital-skills and employment-oriented training.",
        icon: FiUsers,
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

            <div className="mt-12 grid border-y border-white/15 sm:grid-cols-2 lg:grid-cols-4">
                {partnershipModels.map((model, index) => {
                    const Icon = model.icon;

                    return (
                        <article key={model.title} className={`py-8 sm:px-7 lg:min-h-64 lg:px-8 ${index > 0 ? "border-t border-white/15 sm:border-t-0" : ""} ${index % 2 === 1 ? "sm:border-l sm:border-white/15" : ""} ${index >= 2 ? "sm:border-t sm:border-white/15 lg:border-t-0" : ""} ${index > 0 ? "lg:border-l lg:border-white/15" : ""}`}>
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success_main text-primary">
                                <Icon size={22} />
                            </span>
                            <h3 className="mt-6 text-lg font-extrabold leading-7 text-white">{model.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-white/70">{model.description}</p>
                        </article>
                    );
                })}
            </div>

            <div className="mt-10 text-center">
                <Link href="/contact" className="inline-flex items-center justify-center gap-3 rounded-xl bg-success_main px-7 py-4 text-sm font-bold text-primary transition hover:bg-white hover:text-success_deep md:text-base">
                    Discuss Your Training Requirement <FiArrowRight size={19} />
                </Link>
            </div>
        </div>
    </div>
);

export default TrainingPartnerships;
