import { FiBarChart2, FiBriefcase, FiDatabase, FiPieChart, FiTrendingUp } from "react-icons/fi";

// Example career paths, rather than live vacancies or guaranteed placements.
const positions = [
    { id: "data-analyst", title: "Junior Data Analyst", description: "Clean and explore business data, track important metrics, and share insights with your team.", skills: ["Data preparation", "Reporting"], icon: FiBarChart2 },
    { id: "power-bi-developer", title: "Power BI Developer", description: "Build data models, write DAX measures, and create interactive reports for business users.", skills: ["Power BI", "DAX"], icon: FiPieChart },
    { id: "bi-analyst", title: "Business Intelligence Analyst", description: "Turn business questions into useful dashboards and help teams understand their performance.", skills: ["Business metrics", "Dashboards"], icon: FiTrendingUp },
    { id: "reporting-analyst", title: "Reporting Analyst", description: "Prepare regular reports, organize data from different sources, and communicate clear findings.", skills: ["Excel", "Data visualization"], icon: FiDatabase },
];

export default function JobPositionsGrid() {
    return (
        <section aria-labelledby="job-positions-heading">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 id="job-positions-heading" className="text-[22px] font-bold tracking-[-0.025em] text-primary md:text-[26px]">Explore your career options</h2>
                    <p className="mt-2 max-w-[580px] text-sm leading-relaxed text-gray700">Discover roles where data analytics and Power BI skills can make a difference.</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f2f6ed] px-3 py-2 text-xs font-semibold text-success_deep">
                    <FiBriefcase aria-hidden="true" size={14} /> {positions.length} roles
                </span>
            </div>

            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                {positions.map(({ id, title, description, skills, icon: Icon }) => (
                    <li key={id}>
                        <article className="flex h-full flex-col rounded-xl border border-[#e2e7df] bg-white p-5 transition-[border-color,box-shadow] duration-200 hover:border-success_deep/35 hover:shadow-[0_6px_20px_rgba(32,128,79,0.06)] motion-reduce:transition-none md:p-6">
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-success_deep/10 bg-[#f2f6ed] text-success_deep">
                                <Icon aria-hidden="true" size={22} />
                            </div>
                            <h3 className="text-base font-semibold leading-relaxed text-primary">{title}</h3>
                            <p className="mb-5 mt-2 text-sm leading-7 text-gray700">{description}</p>
                            <ul aria-label={`${title} skills`} className="mt-auto flex flex-wrap gap-2 border-t border-[#edf0e9] pt-4">
                                {skills.map((skill) => <li key={skill} className="rounded-full bg-[#f2f6ed] px-2.5 py-1 text-[11px] font-semibold text-success_deep">{skill}</li>)}
                            </ul>
                        </article>
                    </li>
                ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-gray700">These are example career paths. Opportunities depend on your experience, portfolio, and employer requirements.</p>
        </section>
    );
}
