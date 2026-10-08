import Image from "next/image";

const benefits = [
    { id: "practical-skills", icon: "/assets/icons/traner.svg", text: "Build practical Power BI skills with guided exercises and real business examples." },
    { id: "data-preparation", icon: "/assets/icons/system.svg", text: "Learn to clean, organize, and connect data from different sources with confidence." },
    { id: "dashboards", icon: "/assets/icons/system.svg", text: "Create clear dashboards that help people understand performance and make informed decisions." },
    { id: "calculations", icon: "/assets/icons/tester.svg", text: "Practice DAX calculations to answer everyday business questions and track key metrics." },
    { id: "ai-workflow", icon: "/assets/icons/tester.svg", text: "Explore how AI can support your analysis while learning to verify its suggestions." },
    { id: "portfolio", icon: "/assets/icons/writer.svg", text: "Work on a sample project you can use to demonstrate your skills and explain your approach." },
    { id: "presentation", icon: "/assets/icons/traner.svg", text: "Develop the confidence to present insights clearly to your team or stakeholders." },
    { id: "next-step", icon: "/assets/icons/writer.svg", text: "Build a foundation for further learning in business intelligence and data analytics." },
];

export default function BenefitsList() {
    return (
        <section aria-labelledby="benefits-heading">
            <div className="mb-6">
                <h2 id="benefits-heading" className="text-[22px] font-bold tracking-[-0.025em] text-primary md:text-[26px]">What you’ll gain</h2>
                <p className="mt-2 max-w-[580px] text-sm leading-relaxed text-gray700">Practical skills and a clearer path to working with data.</p>
            </div>

            <ul className="space-y-4">
                {benefits.map((benefit) => (
                    <li key={benefit.id} className="flex items-start gap-3 rounded-xl border border-[#e2e7df] bg-[#f9fbf7] px-4 py-4 md:gap-4 md:px-5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#e2e7df] bg-white">
                            <Image src={benefit.icon} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                        </span>
                        <p className="text-sm leading-7 text-secondary">{benefit.text}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
