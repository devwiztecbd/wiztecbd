import { FiBookOpen, FiCalendar, FiClock, FiMapPin, FiMonitor, FiWatch } from "react-icons/fi";

const priceFormatter = new Intl.NumberFormat("en-BD");

export default function CourseModeDetails({ options = [] }) {
    const safeOptions = Array.isArray(options) && options.length > 0
        ? options
        : [
            { id: "online", label: "Online", price: 8000, duration: "3 Months", classes: "24 classes", learningHours: "40 hours", classDuration: "2 hours", description: "Attend live from anywhere", days: ["Sunday", "Monday"], time: "7:00 PM - 9:00 PM" },
            { id: "offline", label: "Offline", price: 12000, duration: "3 Months", classes: "24 classes", learningHours: "40 hours", classDuration: "2 hours", description: "Learn in our classroom", days: ["Sunday", "Monday", "Saturday"], time: "7:00 PM - 9:00 PM" }
        ];

    return (
        <section aria-labelledby="course-modes-heading">
            <div className="mb-6">
                <h2 id="course-modes-heading" className="text-[22px] font-bold tracking-[-0.025em] text-primary md:text-[26px]">Choose the way you learn</h2>
                <p className="mt-2 max-w-[580px] text-sm leading-relaxed text-gray700">Compare the schedule and fee for online and classroom learning.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                {safeOptions.map((option) => {
                    const ModeIcon = option.id === "online" ? FiMonitor : FiMapPin;
                    const details = [
                        { label: "Duration", value: option.duration, icon: FiCalendar },
                        { label: "Classes", value: option.classes, icon: FiBookOpen },
                        { label: "Learning hours", value: option.learningHours, icon: FiClock },
                        { label: "Class duration", value: option.classDuration, icon: FiWatch },
                        { label: "Days", value: option.days?.join(", ") || "To be announced", icon: FiCalendar },
                        { label: "Time", value: option.time || "To be announced", icon: FiClock },
                    ];

                    return (
                        <article key={option.id} className="overflow-hidden rounded-xl border border-[#dfe5d9] bg-white">
                            <div className="border-b border-[#e3e9dd] bg-[#f2f6ed] p-5 md:p-6">
                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-success_deep/15 bg-white text-success_deep">
                                    <ModeIcon aria-hidden="true" size={22} />
                                </div>
                                <h3 className="text-xl font-bold text-primary">{option.label}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray700">{option.description}</p>
                            </div>
                            <div className="p-5 md:p-6">
                                <dl className="space-y-5">
                                    {details.map(({ label, value, icon: Icon }) => (
                                        <div key={label} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                                            <dt className="flex shrink-0 items-center gap-2 text-gray700"><Icon aria-hidden="true" size={16} className="shrink-0 text-success_deep" />{label}</dt>
                                            <dd className="min-w-0 text-right font-semibold text-secondary">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                                <div className="mt-6 border-t border-[#e5e7eb] pt-5">
                                    <p className="mb-1 text-xs font-medium text-gray700">Course fee</p>
                                    <p className="text-2xl font-bold tracking-[-0.025em] text-success_deep">BDT {priceFormatter.format(option.price)}</p>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
