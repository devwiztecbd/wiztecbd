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
        featured: true,
    },
];

const WhyChooseTraining = () => (
    <div className="relative overflow-hidden bg-[#F2F7EC] py-16 text-primary md:py-24">
        <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-success_main/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-success_deep/10 blur-3xl" />

        <div className="container relative mx-auto grid max-w-xl gap-12 px-4 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-success_deep md:text-sm">
                    <span className="h-0.5 w-10 bg-success_main" /> Why Choose WiztecBD for Training?
                </p>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight md:text-5xl">
                    Technology Expertise Meets <span className="text-success_deep">Training Capability</span>
                </h2>
                <p className="mt-6 max-w-xl border-l-2 border-success_main pl-5 text-sm leading-7 text-gray500 md:text-base">
                    Evidence from delivered programs, technology coverage and reported outcomes—not generic claims.
                </p>
            </div>

            <div className="grid border-t border-success_main/25 sm:grid-cols-2">
                {reasons.map((reason, index) => {
                    const Icon = reason.icon;

                    return (
                        <article key={reason.title} className={`relative border-b border-success_main/25 py-7 sm:px-7 ${index % 2 === 1 && !reason.featured ? "sm:border-l sm:border-success_main/25" : ""} ${reason.featured ? "sm:col-span-2" : ""}`}>
                            <div className={`flex items-start gap-5 ${reason.featured ? "md:items-center" : ""}`}>
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success_light text-success_deep">
                                    <Icon size={21} />
                                </span>
                                <div>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-success_deep/45">Reason {String(index + 1).padStart(2, "0")}</span>
                                    <h3 className="mt-1.5 text-base font-extrabold leading-6 text-primary md:text-lg">{reason.title}</h3>
                                    <p className={`mt-2 text-sm leading-6 text-gray500 ${reason.featured ? "max-w-3xl" : ""}`}>{reason.description}</p>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    </div>
);

export default WhyChooseTraining;
