import Link from "next/link";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";

const TrainingFinalCTA = () => (
    <div className="relative overflow-hidden bg-[#173F31] py-16 text-white md:py-24 mb-20">
        <div className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-success_main/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-52 right-0 h-[28rem] w-[28rem] rounded-full bg-success_main/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-y-0 right-[15%] hidden w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block" />

        <div className="container relative mx-auto max-w-xl px-4">
            <div className="mx-auto max-w-4xl text-center">
                <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-success_main md:text-sm">
                    <span className="h-px w-10 bg-success_main" /> Training Partnerships <span className="h-px w-10 bg-success_main" />
                </p>

                <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white md:text-5xl">
                    Build Skills. Strengthen Workforces. <span className="text-success_main">Create Digital Opportunities.</span>
                </h2>

                <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/75 md:text-lg md:leading-8">
                    Partner with WiztecBD to design and deliver practical, industry-aligned technical training programs for the digital economy.
                </p>

                <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                    <Link href="#trainingAreas" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/35 px-7 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-success_deep md:text-base">
                        <FiBookOpen size={19} /> Explore Training Programs
                    </Link>
                    <Link href="#trainingInquiry" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-success_main px-7 py-3 text-sm font-bold text-primary transition hover:bg-white hover:text-success_deep md:text-base">
                        Partner With WiztecBD <FiArrowRight size={19} />
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default TrainingFinalCTA;
