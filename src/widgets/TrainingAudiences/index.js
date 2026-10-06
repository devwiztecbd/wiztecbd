import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiBriefcase, FiFlag, FiUser } from "react-icons/fi";

const audiences = [
    {
        title: "Individuals & Young Professionals",
        description: "Technical and digital skills for employability, career development and professional growth.",
        icon: FiUser,
    },
    {
        title: "Educational & Training Institutions",
        description: "Structured technology programs designed to complement institutional learning and skill-development initiatives.",
        icon: FiBookOpen,
    },
    {
        title: "Government & Public-Sector Initiatives",
        description: "Large-scale ICT, employability and workforce-development training programs.",
        icon: FiFlag,
    },
    {
        title: "Organizations & Workforce Programs",
        description: "Technical upskilling, reskilling and specialized technology training based on organizational requirements.",
        icon: FiBriefcase,
    },
];

const institutionalConnections = [
    "Ministry of Youth & Sports",
    "Ministry of Education",
    "Bangladesh Hi-Tech Park Authority",
    "EDGE-related Programs",
];

const TrainingAudiences = () => (
    <div className="relative overflow-hidden bg-[#F8F9FB] py-16 text-primary md:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-success_main/10 blur-3xl" />

        <div className="container relative mx-auto max-w-xl px-4">
            <div className="mx-auto max-w-4xl text-center">
                <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-success_deep md:text-sm">
                    <span className="h-0.5 w-10 bg-success_main" /> Who We Train <span className="h-0.5 w-10 bg-success_main" />
                </p>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight md:text-5xl">
                    Training Designed for Different <span className="text-success_deep">Learning & Workforce Needs</span>
                </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
                {audiences.map((audience, index) => {
                    const Icon = audience.icon;

                    return (
                        <article key={audience.title} className="group relative min-h-64 overflow-hidden rounded-3xl border border-success_main/15 bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-success_main/40 hover:shadow-xl md:p-9">
                            <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-success_light transition-transform duration-500 group-hover:scale-125" />
                            <div className="relative flex h-full flex-col">
                                <div className="flex items-start justify-between">
                                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success_light text-success_deep transition-colors duration-300 group-hover:bg-success_deep group-hover:text-white">
                                        <Icon size={25} />
                                    </span>
                                    <span className="text-sm font-bold tracking-[0.18em] text-success_deep/35">0{index + 1}</span>
                                </div>
                                <div className="mt-auto pt-9">
                                    <h3 className="max-w-md text-xl font-extrabold leading-7 text-primary md:text-2xl">{audience.title}</h3>
                                    <p className="mt-3 max-w-lg text-sm leading-6 text-gray500 md:text-base">{audience.description}</p>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl bg-[#55594C] p-7 text-white shadow-xl md:p-9">
                <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                    <div>
                        <p className="max-w-4xl text-sm font-medium leading-7 text-white/85 md:text-base">
                            Our portfolio supports strong institutional and government positioning through projects connected with:
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2.5">
                            {institutionalConnections.map((connection) => (
                                <span key={connection} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90">
                                    {connection}
                                </span>
                            ))}
                        </div>
                    </div>

                    <Link href="#trainingInquiry" className="inline-flex w-fit shrink-0 items-center justify-center gap-3 rounded-xl bg-success_main px-6 py-4 text-sm font-bold text-primary transition hover:bg-white hover:text-success_deep">
                        Find the Right Training Program <FiArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default TrainingAudiences;
