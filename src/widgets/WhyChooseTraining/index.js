import { FiCode, FiFlag, FiLayers, FiMapPin, FiTrendingUp, FiUsers } from "react-icons/fi";

const reasons = [
    {
        title: "Training Across Diverse Technologies",
        description: "From basic digital literacy through advanced AI, RPA and 4IR.",
        icon: FiLayers,
    },
    {
        title: "Large-Scale Program Experience",
        description: "Portfolio assignments range from dozens to thousands of participants.",
        icon: FiUsers,
    },
    {
        title: "Government & Institutional Exposure",
        description: "Experience associated with government and workforce-development initiatives.",
        icon: FiFlag,
    },
    {
        title: "Multi-Location Experience",
        description: "Training activities across five major locations listed in the portfolio.",
        icon: FiMapPin,
    },
    {
        title: "Employment-Oriented Outcomes",
        description: "Reported placement rates of up to 90% in selected programs.",
        icon: FiTrendingUp,
    },
    {
        title: "Technology Company Advantage",
        description: "Training is one wing of a company that also works in software, web, mobile, enterprise systems and broader digital transformation. WiztecBD's main service portfolio includes software, mobile, web, ERP and other technology services alongside training.",
        icon: FiCode,
    },
];

const WhyChooseTraining = () => (
    <div className="relative overflow-hidden bg-[#F2F7EC] py-16 text-primary md:py-24">
        <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-success_main/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-success_deep/10 blur-3xl" />

        <div className="container relative mx-auto max-w-xl px-4">
            <div className="mx-auto max-w-4xl text-center">
                <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-success_deep md:text-sm">
                    <span className="h-0.5 w-10 bg-success_main" /> Why Choose WiztecBD for Training? <span className="h-0.5 w-10 bg-success_main" />
                </p>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight md:text-5xl">
                    Technology Expertise Meets <span className="text-success_deep">Training Capability</span>
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray500 md:text-base">
                    Evidence from delivered programs, technology coverage and reported outcomes—not generic claims.
                </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {reasons.map((reason, index) => {
                    const Icon = reason.icon;
                    const reasonNumber = String(index + 1).padStart(2, "0");

                    return (
                        <article key={reason.title} className="group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border border-success_main/15 bg-white p-7 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-success_main/45 hover:shadow-3xl md:p-8">
                            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-success_main transition-transform duration-500 group-hover:scale-x-100" />
                            <span className="absolute right-5 top-4 text-5xl font-black leading-none text-success_deep/[0.06]">{reasonNumber}</span>

                            <div className="relative flex items-center justify-between">
                                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success_light text-success_deep transition duration-300 group-hover:bg-success_deep group-hover:text-white">
                                    <Icon size={23} />
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-success_deep/50">Reason {reasonNumber}</span>
                            </div>

                            <div className="relative mt-auto pt-10">
                                <h3 className="text-lg font-extrabold leading-7 text-primary transition-colors duration-300 group-hover:text-success_deep">{reason.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-gray500">{reason.description}</p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    </div>
);

export default WhyChooseTraining;
