import Image from "next/image";
import Marquee from "react-fast-marquee";

import ScrollAnimatedSection from "@/components/ScrollAnimationSection";
import { servedClient } from "@/app/staticData/home";

const clientRows = Array.from({ length: 3 }, (_, rowIndex) => servedClient.filter((_, clientIndex) => clientIndex % 3 === rowIndex));

const ServedClients = ({ title = "Our Clients" }) => {
    return (
        <div className="mx-auto grid max-w-2xl items-center gap-10 overflow-hidden px-4 lg:grid-cols-[minmax(260px,0.34fr)_minmax(0,0.66fr)] lg:gap-14">
            <ScrollAnimatedSection delay={100}>
                <div className="max-w-md text-white">
                    <h2 className="text-H1 font-bold text-white">{title}</h2>
                    <p className="mt-6 text-sm font-medium leading-8 text-white/90 md:text-base">
                        We partner with businesses, corporations, service providers, and government agencies that rely on our technology every day. Trusted by leading organizations, we deliver reliable, scalable, and secure solutions.
                    </p>
                </div>
            </ScrollAnimatedSection>

            <div className="min-w-0 overflow-hidden">
                <ScrollAnimatedSection delay={200}>
                    <div
                        className="min-w-0 space-y-1 overflow-hidden"
                        style={{
                            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                        }}
                    >
                        {clientRows.map((clients, rowIndex) => (
                            <Marquee
                                key={rowIndex}
                                autoFill
                                direction={rowIndex === 1 ? "right" : "left"}
                                speed={rowIndex === 1 ? 24 : 28}
                                pauseOnHover
                                pauseOnClick
                            >
                                {clients.map((client) => (
                                    <div
                                        key={client.id}
                                        className="group mx-0.5 flex h-20 w-36 items-center justify-center bg-white px-5 md:h-24 md:w-40 lg:w-44"
                                    >
                                        <Image
                                            src={client.image}
                                            alt={`Client ${client.id}`}
                                            height={64}
                                            width={150}
                                            className="max-h-12 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 md:max-h-14"
                                        />
                                    </div>
                                ))}
                            </Marquee>
                        ))}
                    </div>
                </ScrollAnimatedSection>
            </div>
        </div>
    );
};

export default ServedClients;
