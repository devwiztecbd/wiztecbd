import { FiArrowUpRight, FiBookOpen, FiBriefcase, FiTool } from "react-icons/fi";

const pillars = [
    {
        title: "Learn",
        description: "Industry-relevant technical knowledge.",
        icon: FiBookOpen,
    },
    {
        title: "Apply",
        description: "Practical, project-oriented skill development.",
        icon: FiTool,
    },
    {
        title: "Advance",
        description: "Career, workforce and institutional capacity development.",
        icon: FiBriefcase,
    },
];

const TrainingIntroduction = () => (
    <div className="relative overflow-hidden bg-[#F2F7EC] py-16 text-primary md:py-24">
        <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-success_main/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-success_deep/10 blur-3xl" />

        <div className="container relative mx-auto max-w-xl px-4">
            <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div>
                    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-success_deep md:text-sm">
                        <span className="h-0.5 w-10 bg-success_main" /> Training Introduction
                    </p>
                    <h2 className="mt-5 text-3xl font-extrabold leading-tight text-primary md:text-5xl">
                        Industry-Relevant Skills. <span className="text-success_deep">Practical Learning.</span> Measurable Impact.
                    </h2>
                </div>

                <div className="space-y-5 border-l-2 border-success_main/30 pl-6 text-sm leading-7 text-gray500 md:pl-8 md:text-base">
                    <p>WiztecBD delivers technology and professional skill-development programs designed around real-world industry requirements. Our training portfolio spans traditional software skills, digital technologies and emerging 4IR capabilities, supporting learners, institutions, government initiatives and workforce-development programs.</p>
                    <p>From web and mobile development to artificial intelligence, machine learning, automation, data analytics and digital skills, our goal is to develop practical capability that can translate into employment, productivity and long-term professional growth.</p>
                </div>
            </div>

            <div className="mt-12 overflow-hidden rounded-3xl border border-success_main/20 bg-white/80 shadow-xl backdrop-blur-sm md:mt-16">
                <div className="grid md:grid-cols-3">
                    {pillars.map((pillar, index) => {
                        const Icon = pillar.icon;

                        return (
                            <div key={pillar.title} className={`group relative flex min-h-48 flex-col p-7 md:p-8 ${index > 0 ? "border-t border-success_main/20 md:border-l md:border-t-0" : ""}`}>
                                <div className="flex items-start justify-between">
                                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success_light text-success_deep transition duration-300 group-hover:bg-success_deep group-hover:text-white">
                                        <Icon size={25} />
                                    </span>
                                    <span className="text-xs font-bold tracking-[0.18em] text-success_deep/45">0{index + 1}</span>
                                </div>
                                <div className="mt-7">
                                    <h3 className="flex items-center gap-2 text-2xl font-extrabold text-primary">
                                        {pillar.title}
                                        <FiArrowUpRight className="text-success_main transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
                                    </h3>
                                    <p className="mt-2 max-w-xs text-sm leading-6 text-gray500">{pillar.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
);

export default TrainingIntroduction;
