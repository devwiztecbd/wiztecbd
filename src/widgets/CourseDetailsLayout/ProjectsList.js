import Image from "next/image";
import { FiLayers } from "react-icons/fi";

const previewImage = "/assets/images/course-project-dashboard.svg";

const projects = [
    {
        id: "sales-dashboard",
        title: "Sales performance dashboard",
        description: "Turn a sample sales dataset into an interactive dashboard. Compare revenue, explore product performance, and highlight trends that help a business plan its next steps.",
        tags: ["Power BI", "DAX", "Data visualization"],
        image: previewImage,
    },
    {
        id: "customer-insights",
        title: "Customer insights report",
        description: "Explore sample customer data to understand buying habits and customer segments. Present clear insights that help a team identify its most valuable audiences.",
        tags: ["Power Query", "Data modeling", "Customer analysis"],
        image: previewImage,
    },
    {
        id: "business-overview",
        title: "Business KPI dashboard",
        description: "Bring key business metrics into one report. Build a simple model, create useful measures, and design a dashboard that makes performance easy to follow.",
        tags: ["Power BI", "Business metrics", "Reporting"],
        image: previewImage,
    },
];

export default function ProjectsList() {
    return (
        <section aria-labelledby="projects-heading">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 id="projects-heading" className="text-[22px] font-bold tracking-[-0.025em] text-primary md:text-[26px]">Projects you’ll build</h2>
                    <p className="mt-2 max-w-[580px] text-sm leading-relaxed text-gray700">Put your learning into practice with guided business projects.</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f2f6ed] px-3 py-2 text-xs font-semibold text-success_deep">
                    <FiLayers aria-hidden="true" size={14} /> {projects.length} projects
                </span>
            </div>

            <ul className="space-y-5">
                {projects.map((project, index) => (
                    <li key={project.id}>
                        <article className="grid overflow-hidden rounded-xl border border-[#e2e7df] bg-white sm:grid-cols-[1.15fr_1fr]">
                            <div className="flex flex-col justify-center p-5 md:p-6">
                                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-success_deep">Project {String(index + 1).padStart(2, "0")}</p>
                                <h3 className="text-lg font-semibold leading-snug tracking-[-0.02em] text-primary">{project.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-gray700">{project.description}</p>
                                <ul aria-label="Project tools and skills" className="mt-4 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => <li key={tag} className="rounded-full bg-[#f2f6ed] px-2.5 py-1 text-[10px] font-semibold text-success_deep">{tag}</li>)}
                                </ul>
                            </div>
                            <div className="flex min-w-0 items-center justify-center border-t border-[#e2e7df] bg-[#f2f6ed] p-4 sm:border-l sm:border-t-0 md:p-5">
                                <Image src={project.image} alt={`Demo dashboard preview for ${project.title}`} width={640} height={420} className="h-auto w-full rounded-lg object-contain" />
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}
