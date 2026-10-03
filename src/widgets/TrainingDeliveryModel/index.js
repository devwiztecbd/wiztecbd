import { FiAward, FiBookOpen, FiCheckSquare, FiClipboard, FiFileText, FiSearch, FiTarget, FiTool, FiUsers } from "react-icons/fi";

const deliverySteps = [
    { title: "Training Need Assessment", icon: FiSearch },
    { title: "Curriculum & Learning Plan", icon: FiBookOpen },
    { title: "Participant Mobilization", icon: FiUsers },
    { title: "Instructor-Led Training", icon: FiClipboard },
    { title: "Practical Exercises & Projects", icon: FiTool },
    { title: "Assessment", icon: FiCheckSquare },
    { title: "Certification", icon: FiAward },
    { title: "Job / Outcome Tracking", icon: FiTarget },
    { title: "Reporting", icon: FiFileText },
];

const TrainingDeliveryModel = () => (
    <div className="relative overflow-hidden bg-[#F8F9FB] py-16 text-primary md:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-success_main/10 blur-3xl" />

        <div className="container relative mx-auto max-w-xl px-4">
            <div className="mx-auto max-w-4xl text-center">
                <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-success_deep md:text-sm">
                    <span className="h-0.5 w-10 bg-success_main" /> From Need to Outcome <span className="h-0.5 w-10 bg-success_main" />
                </p>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight md:text-5xl">Training Delivery <span className="text-success_deep">Model</span></h2>
                <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-gray500 md:text-base">A structured delivery roadmap that connects training requirements with practical learning, assessment and measurable outcomes.</p>
            </div>

            <div className="relative mt-12">
                <div className="hidden xl:flex">
                    {deliverySteps.map((step, index) => {
                        const Icon = step.icon;
                        const isLast = index === deliverySteps.length - 1;

                        return (
                            <div key={step.title} className="flex min-w-0 flex-1 items-start">
                                <div className="w-32 shrink-0 text-center">
                                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-success_deep bg-white text-success_deep">
                                        <Icon size={23} />
                                    </span>
                                    <span className="mt-4 block text-[9px] font-bold uppercase tracking-[0.16em] text-success_deep/50">Step {String(index + 1).padStart(2, "0")}</span>
                                    <h3 className="mt-1.5 text-xs font-bold leading-5 text-primary">{step.title}</h3>
                                </div>

                                {!isLast && (
                                    <span className="relative mt-8 h-0.5 min-w-4 flex-1 bg-success_main/40">
                                        <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-success_deep" />
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="relative xl:hidden">
                    <div className="absolute bottom-8 left-7 top-8 w-0.5 bg-success_main/40" />
                    {deliverySteps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div key={step.title} className="relative flex min-h-24 items-center gap-5 pl-16">
                                <span className="absolute left-7 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-success_deep bg-[#F8F9FB] text-success_deep">
                                    <Icon size={19} />
                                </span>
                                <div className="py-4">
                                    <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-success_deep/50">Step {String(index + 1).padStart(2, "0")}</span>
                                    <h3 className="mt-1 text-sm font-bold leading-6 text-primary md:text-base">{step.title}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
);

export default TrainingDeliveryModel;
