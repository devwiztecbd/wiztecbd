import Image from "next/image";

import ScrollAnimatedSection from "@/components/ScrollAnimationSection";
import { membershipCredentials } from "@/app/staticData/home";

const MembershipCertification = () => {
    return (
        <div className="container mx-auto max-w-xl px-4">
            <ScrollAnimatedSection delay={100}>
                <h2 className="text-center text-H1 font-bold text-primary">Membership &amp; Certification</h2>
            </ScrollAnimatedSection>

            <ScrollAnimatedSection delay={200}>
                <div className="mt-8 grid overflow-hidden rounded-2xl bg-white/90 shadow-xl sm:grid-cols-3 md:mt-10">
                    {membershipCredentials.map((credential, index) => (
                        <div
                            key={credential.id}
                            className={`flex min-h-56 flex-col items-center justify-center px-6 py-8 md:min-h-64 ${index > 0 ? "border-t border-black/10 sm:border-l sm:border-t-0" : ""}`}
                        >
                            <div className="flex h-32 w-full items-center justify-center md:h-40">
                                <Image
                                    src={credential.image}
                                    alt={`${credential.name} logo`}
                                    height={160}
                                    width={320}
                                    className="max-h-full w-auto max-w-full object-contain"
                                />
                            </div>
                            <p className="mt-4 text-center text-base font-semibold text-primary md:text-lg">{credential.name}</p>
                        </div>
                    ))}
                </div>
            </ScrollAnimatedSection>
        </div>
    );
};

export default MembershipCertification;
