import Image from "next/image";
import Marquee from "react-fast-marquee";

import ScrollAnimatedSection from "@/components/ScrollAnimationSection";
import { techPower } from "@/app/staticData/home";

const technologyRows = Array.from({ length: 3 }, (_, rowIndex) => techPower.filter((_, technologyIndex) => technologyIndex % 3 === rowIndex));

const TechPower = () => {
    return (
        <div>
            <ScrollAnimatedSection delay={100}>
                <h2 className="mb-8 text-center text-H1 font-bold text-primary md:mb-12">Tech That Powers Us</h2>
            </ScrollAnimatedSection>

            <ScrollAnimatedSection delay={200}>
                <div
                    className="space-y-8 overflow-hidden md:space-y-10"
                    style={{
                        maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                        WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                    }}
                >
                    {technologyRows.map((technologies, rowIndex) => (
                        <Marquee
                            key={rowIndex}
                            autoFill
                            direction={rowIndex === 1 ? "right" : "left"}
                            speed={rowIndex === 1 ? 52 : 58}
                            pauseOnHover
                            pauseOnClick
                        >
                            {technologies.map((technology) => (
                                <div key={technology.id} className="mx-6 flex h-16 w-32 flex-shrink-0 items-center justify-center md:mx-10 md:h-20 md:w-40">
                                    <Image
                                        src={technology.image}
                                        alt={technology.alt}
                                        height={80}
                                        width={160}
                                        className="max-h-14 w-auto max-w-full object-contain md:max-h-16"
                                    />
                                </div>
                            ))}
                        </Marquee>
                    ))}
                </div>
            </ScrollAnimatedSection>
        </div>
    );
};

export default TechPower;
