import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiLayers, FiMapPin, FiTrendingUp, FiUsers } from "react-icons/fi";

const capabilities = [
    {
        title: "Large-Scale Delivery",
        description: "Training engagements ranging from focused cohorts to programs involving thousands of participants.",
        icon: FiUsers,
        image: "/assets/images/training images/large_scale_delivery_training_lab.png",
    },
    {
        title: "Multi-Location Implementation",
        description: "Experience across Dhaka, Chattogram, Sylhet, Khulna and Rajshahi.",
        icon: FiMapPin,
        image: "/assets/images/training images/multi_location_implementation_lab.png",
    },
    {
        title: "Multi-Domain Curriculum",
        description: "Software development, AI, analytics, automation, digital skills and professional development.",
        icon: FiLayers,
        image: "/assets/images/training images/multi_domain_curriculum_lab.png",
    },
    {
        title: "Outcome-Oriented Programs",
        description: "Several listed projects report placement outcomes between 80% and 90%.",
        icon: FiTrendingUp,
        image: "/assets/images/training images/Collaborative Tech Lab Celebration.png",
    },
];

const InstitutionalTraining = () => (
    <div className="relative overflow-hidden bg-[#F8F9FB] py-16 text-primary md:py-24">
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-success_main/10 blur-3xl" />

        <div className="container relative mx-auto max-w-xl px-4">
            <div className="overflow-hidden rounded-[2rem] border border-success_main/15 shadow-xl lg:grid lg:grid-cols-[0.92fr_1.08fr]">
                <div className="relative flex flex-col justify-center overflow-hidden bg-[#55594C] p-8 text-white md:p-12 lg:p-14">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-success_main/20" />
                    <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-success_main/20" />
                    <div className="pointer-events-none absolute -bottom-32 -left-28 h-80 w-80 rounded-full bg-success_main/10 blur-3xl" />

                    <div className="relative">
                        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-success_main md:text-sm">
                            <span className="h-0.5 w-10 bg-success_main" /> Government & Institutional Training
                        </p>
                        <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white md:text-5xl">
                            A Trusted Capability for <span className="text-success_main">Large-Scale Training Programs</span>
                        </h2>

                        <div className="mt-7 space-y-5 text-sm leading-7 text-white/80 md:text-base">
                            <p>WiztecBD has experience contributing to technology and workforce-development programs involving government ministries, public-sector initiatives, institutional partners and technology organizations.</p>
                            <p>Our portfolio demonstrates the ability to work across multiple technology domains, geographic locations and participant volumes—from focused specialist programs to large-scale digital-literacy initiatives.</p>
                        </div>

                        <div className="mt-8 border-l-2 border-success_main pl-5 text-xs font-medium leading-6 text-white/65 md:text-sm">
                            These capabilities are supported by the delivery scope, locations, domains and reported outcomes represented across our training portfolio.
                        </div>

                        <Link href="/contact" className="mt-9 inline-flex w-fit items-center gap-3 rounded-xl bg-success_main px-6 py-4 text-sm font-bold text-primary transition hover:bg-white hover:text-success_deep">
                            Discuss an Institutional Training Project <FiArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                <div className="grid bg-[#173F31] sm:grid-cols-2">
                    {capabilities.map((capability, index) => {
                        const Icon = capability.icon;

                        return (
                            <article
                                key={capability.title}
                                className={`group relative flex min-h-64 flex-col justify-between overflow-hidden p-7 text-white md:p-9 ${index > 0 ? "border-t border-white/15 sm:border-t-0" : ""} ${index % 2 === 1 ? "sm:border-l sm:border-white/15" : ""} ${index >= 2 ? "sm:border-t sm:border-white/15" : ""}`}
                            >
                                <Image
                                    src={capability.image}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1024px) 27vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,30,23,.2)_0%,rgba(8,30,23,.42)_42%,rgba(8,30,23,.8)_100%)] transition-opacity duration-500 group-hover:opacity-90" />

                                <div className="relative z-10 flex items-start justify-between">
                                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-success_main backdrop-blur-sm transition duration-300 group-hover:bg-success_main group-hover:text-primary">
                                        <Icon size={25} />
                                    </span>
                                    <span className="text-xs font-bold tracking-[0.18em] text-white/60">0{index + 1}</span>
                                </div>
                                <div className="relative z-10 mt-8">
                                    <h3 className="text-xl font-extrabold leading-7 text-white [text-shadow:0_2px_12px_rgba(0,0,0,.45)]">{capability.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,.65)]">{capability.description}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
);

export default InstitutionalTraining;
