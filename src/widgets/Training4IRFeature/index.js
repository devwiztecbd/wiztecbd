import Link from "next/link";
import { FiArrowRight, FiBarChart2, FiCode, FiCpu, FiLayers, FiRefreshCw, FiSettings, FiShield, FiUsers } from "react-icons/fi";

const capabilities = [
    { title: "AI & Machine Learning", icon: FiCpu, position: "left-[5%] top-[5%]" },
    { title: "RPA & Automation", icon: FiRefreshCw, position: "right-[3%] top-[8%]" },
    { title: "Embedded Systems", icon: FiSettings, position: "left-0 top-[42%]" },
    { title: "Microcontroller Programming", icon: FiCode, position: "right-0 top-[43%]" },
    { title: "Data Analytics & Power BI", icon: FiBarChart2, position: "bottom-0 left-0" },
    { title: "Information Systems Security", icon: FiShield, position: "bottom-[19%] left-1/2 -translate-x-1/2" },
    { title: "Enterprise IT Governance", icon: FiLayers, position: "bottom-0 right-0" },
];

const Training4IRFeature = () => (
    <div className="relative overflow-hidden bg-[#173F31] py-16 text-white md:py-24">
        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full border border-success_main/15" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full border border-success_main/20" />
        <div className="pointer-events-none absolute -bottom-48 -right-32 h-[34rem] w-[34rem] rounded-full bg-success_main/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />

        <div className="container relative mx-auto grid max-w-xl items-center gap-14 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-success_main md:text-sm">
                    <span className="h-0.5 w-10 bg-success_main" /> Dedicated 4IR Capabilities
                </p>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white md:text-5xl">
                    Building Skills for the <span className="text-success_main">Fourth Industrial Revolution</span>
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
                    Emerging technologies are reshaping industries, workplaces and public services. WiztecBD&apos;s 4IR training experience covers technologies ranging from artificial intelligence and machine learning to automation, embedded systems, data analytics and enterprise IT.
                </p>

                <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-y border-white/15 py-6">
                    <div className="flex items-center gap-3">
                        <FiUsers className="text-success_main" size={28} />
                        <p><strong className="block text-3xl font-extrabold text-white">300</strong><span className="text-xs text-white/65">DEIED Trainees</span></p>
                    </div>
                    <div className="flex items-center gap-3">
                        <FiBarChart2 className="text-success_main" size={28} />
                        <p><strong className="block text-3xl font-extrabold text-white">85%</strong><span className="text-xs text-white/65">Reported Placement</span></p>
                    </div>
                </div>

                <p className="mt-6 text-xs leading-6 text-white/60 md:text-sm">Supported by the technology domains and outcomes reported across the DEIED 4IR project portfolio.</p>

                <Link href="/courses" className="mt-8 inline-flex items-center gap-3 rounded-xl bg-success_main px-6 py-4 text-sm font-bold text-primary transition hover:bg-white hover:text-success_deep">
                    Explore 4IR Training Capabilities <FiArrowRight size={18} />
                </Link>
            </div>

            <div className="lg:hidden">
                <div className="grid gap-4 sm:grid-cols-2">
                    {capabilities.map((capability) => {
                        const Icon = capability.icon;
                        return (
                            <div key={capability.title} className="flex items-center gap-3 border-b border-white/15 py-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-success_main"><Icon size={20} /></span>
                                <span className="text-sm font-semibold text-white">{capability.title}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="relative hidden h-[520px] lg:block" aria-label="Fourth Industrial Revolution training capabilities">
                <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-success_main/15" />
                <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-success_main/35" />
                <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-success_main text-center text-primary shadow-[0_0_70px_rgba(139,196,63,.28)]">
                    <FiCpu size={28} />
                    <strong className="mt-1 text-2xl font-black">4IR</strong>
                    <span className="text-[9px] font-bold uppercase tracking-wider">Skill Core</span>
                </div>

                {capabilities.map((capability) => {
                    const Icon = capability.icon;
                    return (
                        <div key={capability.title} className={`absolute flex max-w-56 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-md ${capability.position}`}>
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success_main/15 text-success_main"><Icon size={19} /></span>
                            <span className="text-xs font-bold leading-5 text-white">{capability.title}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

export default Training4IRFeature;
