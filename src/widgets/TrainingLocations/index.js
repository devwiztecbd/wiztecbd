import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiArrowRight, FiLayers, FiMapPin, FiUsers } from "react-icons/fi";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

const trainingEngagements = [
    { name: "Youth & Sport Development Organization", locations: "Chattogram & Sylhet", mark: "YS" },
    { name: "Directorate of Technical Education", locations: "Dhaka", mark: "DTE" },
    { name: "DEIED Project", locations: "Dhaka, Khulna, Rajshahi, Sylhet & Chattogram", mark: "4IR" },
    { name: "Wadhwani Operation Foundation", locations: "Dhaka", mark: "WF" },
    { name: "EDGE Project", locations: "Dhaka", mark: "EDGE" },
    { name: "Smart Technologies BD Ltd", locations: "Dhaka, Chattogram, Rajshahi, Rangpur, Khulna, Sylhet, Barishal & Mymensingh", mark: "ST" },
    { name: "Digicon Technologies Ltd", locations: "Southwest district cluster across 13 districts", mark: "DT" },
];

const mapLocations = [
    { name: "Rangpur", position: "left-[35%] top-[13%]" },
    { name: "Mymensingh", position: "left-[55%] top-[27%]" },
    { name: "Sylhet", position: "left-[77%] top-[28%]" },
    { name: "Rajshahi", position: "left-[22%] top-[34%]" },
    { name: "Dhaka", position: "left-[55%] top-[43%]", featured: true },
    { name: "Khulna", position: "left-[36%] top-[59%]" },
    { name: "Barishal", position: "left-[56%] top-[60%]" },
    { name: "Chattogram", position: "left-[77%] top-[62%]" },
];

const TrainingLocations = () => (
    <div className="relative overflow-hidden bg-[#F7FAF4] py-16 text-primary md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(rgba(139,196,63,.22) 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/75 to-transparent" />

        <div className="container relative mx-auto grid max-w-2xl items-center gap-12 px-4 xl:grid-cols-[0.96fr_1.04fr] xl:gap-14">
            <div>
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-success_deep md:text-sm">
                    Training Locations <span className="h-0.5 w-10 bg-success_main" />
                </p>
                <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] text-primary md:text-6xl">
                    Training Experience <span className="block text-success_deep">Across Bangladesh</span>
                </h2>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-gray500 md:text-base">
                    WiztecBD has delivered technical training from single-city specialist programs to large-scale multi-location and multi-district initiatives across Bangladesh, empowering individuals, institutions and communities with future-ready skills.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {trainingEngagements.map((engagement, index) => (
                        <div key={engagement.name} className={`group flex items-center gap-4 rounded-2xl border border-success_main/10 bg-white/90 p-4 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-success_main/45 hover:bg-white hover:shadow-xl ${index === trainingEngagements.length - 1 ? "sm:col-span-2" : ""}`}>
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success_light text-[11px] font-black text-success_deep transition duration-300 group-hover:scale-105 group-hover:bg-success_deep group-hover:text-white">{engagement.mark}</span>
                            <span className="min-w-0">
                                <strong className="block text-sm font-extrabold leading-5 text-primary">{engagement.name}</strong>
                                <span className="mt-1 flex items-start gap-1.5 text-xs leading-4 text-gray500"><FiMapPin className="mt-0.5 shrink-0 text-success_deep" /> {engagement.locations}</span>
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-5 grid overflow-hidden rounded-2xl border border-success_main/10 bg-white/90 shadow-lg sm:grid-cols-2 lg:grid-cols-4">
                    <div className="group flex items-center gap-3 border-b border-divider p-4 transition duration-300 hover:bg-success_light sm:border-r lg:border-b-0"><FiMapPin className="shrink-0 text-success_deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" size={25} /><p><strong className="block text-xl text-success_deep">8</strong><span className="text-[10px] text-gray500">Major Regions</span></p></div>
                    <div className="group flex items-center gap-3 border-b border-divider p-4 transition duration-300 hover:bg-success_light lg:border-b-0 lg:border-r"><FiLayers className="shrink-0 text-success_deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" size={25} /><p><strong className="block text-xs text-primary">Multi-District</strong><span className="text-[10px] text-gray500">Coverage</span></p></div>
                    <div className="group flex items-center gap-3 border-b border-divider p-4 transition duration-300 hover:bg-success_light sm:border-b-0 sm:border-r"><FiUsers className="shrink-0 text-success_deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" size={25} /><p><strong className="block text-xl text-success_deep">7,000+</strong><span className="text-[10px] text-gray500">Learners Engaged</span></p></div>
                    <div className="group flex items-center gap-3 p-4 transition duration-300 hover:bg-success_light"><HiOutlineBuildingLibrary className="shrink-0 text-success_deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" size={27} /><p><strong className="block text-xs text-primary">Institutional</strong><span className="text-[10px] text-gray500">Delivery</span></p></div>
                </div>

                <Link href="#trainingInquiry" className="mt-7 inline-flex items-center gap-4 rounded-xl bg-success_deep px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-success_main hover:text-primary md:text-base">
                    Discuss a Training Program <FiArrowRight size={19} />
                </Link>
            </div>

            <div className="relative mx-auto w-full max-w-[590px]">
                <div className="absolute right-0 top-0 z-20 hidden items-center gap-3 rounded-2xl border border-success_main/10 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md sm:flex">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success_light text-success_deep"><HiOutlineBuildingLibrary size={23} /></span>
                    <span className="text-xs font-semibold leading-5 text-secondary">From Local Classrooms<br />to a Brighter Bangladesh</span>
                </div>

                <div className="relative mx-auto aspect-[1531/2138] w-[82%] max-w-[500px]">
                    <div className="absolute inset-[8%] rounded-full bg-success_main/15 blur-3xl" />
                    <div className="absolute inset-0" style={{ filter: "drop-shadow(0 20px 18px rgba(32, 128, 79, .28)) drop-shadow(0 8px 7px rgba(0, 0, 0, .12))" }}>
                        <Image
                            src="/assets/images/maps/bangladesh-districts.svg"
                            alt="District-level administrative map of Bangladesh showing WiztecBD training locations"
                            fill
                            unoptimized
                            sizes="(min-width: 1280px) 500px, 82vw"
                            className="object-contain"
                            style={{ filter: "sepia(1) saturate(2.4) hue-rotate(38deg) brightness(1.12)" }}
                        />
                    </div>

                    {mapLocations.map((location) => (
                        <div key={location.name} className={`absolute z-10 flex items-center ${location.position}`}>
                            <span className={`relative flex items-center justify-center text-success_deep drop-shadow-lg ${location.featured ? "text-4xl" : "text-3xl"}`}>
                                <span className={`absolute h-9 w-9 rounded-full bg-success_main/20 ${location.featured ? "animate-ping" : "blur-sm"}`} />
                                <FaMapMarkerAlt className="relative" />
                            </span>
                            <span className="-ml-1 whitespace-nowrap rounded-lg bg-white/95 px-2.5 py-1.5 text-[10px] font-extrabold text-primary shadow-lg md:text-xs">{location.name}</span>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    </div>
);

export default TrainingLocations;
