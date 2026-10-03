import { FiBarChart2, FiBriefcase, FiCheckCircle, FiTrendingUp } from "react-icons/fi";

const resultCards = [
    {
        value: "85%",
        label: "Reported placement for DEIED 4IR training",
        icon: FiTrendingUp,
        className: "border-success_main/20 bg-[#EAF4DF] text-primary",
        valueClassName: "text-success_deep",
    },
    {
        value: "80%",
        label: "Reported placement across multiple training assignments",
        icon: FiBriefcase,
        className: "border-[#55594C]/15 bg-[#EEF0EA] text-primary",
        valueClassName: "text-[#55594C]",
    },
    {
        value: "90%",
        label: "Highest reported job placement in listed programs",
        icon: FiCheckCircle,
        className: "border-success_deep bg-success_deep text-white sm:col-span-2",
        valueClassName: "text-white",
    },
];

const TrainingResults = () => (
    <div className="relative overflow-hidden bg-[#EEF5E9] py-16 text-primary md:py-24">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-success_main/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-success_deep/10 blur-3xl" />

        <div className="container relative mx-auto grid max-w-xl items-center gap-12 px-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div className="grid gap-5 sm:grid-cols-2">
                {resultCards.map((result) => {
                    const Icon = result.icon;

                    return (
                        <article key={result.value} className={`relative min-h-52 overflow-hidden rounded-3xl border p-7 shadow-xl md:p-9 ${result.className}`}>
                            <div className="absolute -bottom-16 -right-12 h-40 w-40 rounded-full border border-current opacity-10" />
                            <div className="absolute -bottom-10 -right-6 h-28 w-28 rounded-full border border-current opacity-10" />
                            <div className="relative flex h-full flex-col justify-between">
                                <div className="flex items-start justify-between gap-4">
                                    <strong className={`text-5xl font-black leading-none md:text-6xl ${result.valueClassName}`}>{result.value}</strong>
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current/10 bg-white/15"><Icon size={21} /></span>
                                </div>
                                <p className={`mt-8 max-w-md text-sm font-semibold leading-6 ${result.value === "90%" ? "text-white/85" : "text-gray500"}`}>{result.label}</p>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div>
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-success_deep md:text-sm">
                    <span className="h-0.5 w-10 bg-success_main" /> Results & Placement
                </p>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight text-primary md:text-5xl">
                    Training That Goes <span className="text-success_deep">Beyond the Classroom</span>
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-gray500 md:text-base">
                    Selected programs in the WiztecBD portfolio report placement outcomes ranging from 80% to 90%, reinforcing the importance of combining technical learning with practical and employment-oriented skills.
                </p>

                <div className="mt-8 flex items-start gap-4 border-l-2 border-success_main bg-white/55 px-5 py-4">
                    <FiBarChart2 className="mt-0.5 shrink-0 text-success_deep" size={22} />
                    <p className="text-sm font-medium leading-6 text-secondary">The source reports 80%, 85% and 90% outcomes for various assignments.</p>
                </div>
            </div>
        </div>
    </div>
);

export default TrainingResults;
