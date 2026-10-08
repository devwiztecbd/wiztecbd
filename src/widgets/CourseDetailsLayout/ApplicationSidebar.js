"use client";

import { useState } from "react";
import { FiArrowUpRight, FiBookOpen, FiCalendar, FiCheckCircle, FiCircle, FiClock, FiMapPin, FiMonitor } from "react-icons/fi";

const inputClass = "w-full rounded-lg border border-[#dfe4dc] bg-white px-3.5 py-3 text-sm text-secondary outline-none transition placeholder:text-gray700/60 focus:border-success_deep focus:ring-2 focus:ring-success_deep/10";
const formatPrice = (price) => `BDT ${new Intl.NumberFormat("en-BD").format(price)}`;

export default function ApplicationSidebar({ course }) {
    const [showAvailability, setShowAvailability] = useState(false);
    const [selectedMode, setSelectedMode] = useState(course.enrollmentOptions[0].id);
    const selectedOption = course.enrollmentOptions.find((option) => option.id === selectedMode);
    const details = [
        { label: "Duration", value: course.duration, icon: FiCalendar },
        { label: "Classes", value: course.lectures, icon: FiBookOpen },
        { label: "Learning hours", value: course.hours, icon: FiClock },
        { label: "Class format", value: selectedOption.label, icon: selectedMode === "online" ? FiMonitor : FiMapPin },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        // The design preview has no submission integration yet.
        setShowAvailability(true);
    };

    return (
        <aside aria-labelledby="course-application-title" className="overflow-hidden rounded-2xl border border-[#dfe5d9] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.04)] lg:sticky lg:top-[120px]">
            <div className="border-b border-[#e3e9dd] bg-[#f2f6ed] px-6 py-5">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-success_deep">Your next step</p>
                <h2 id="course-application-title" className="text-[22px] font-bold leading-tight tracking-[-0.025em] text-primary">Apply for this course</h2>
            </div>

            <div className="px-6 py-6">
                <dl className="mb-6 space-y-3.5 border-b border-[#e5e7eb] pb-6">
                    {details.map(({ label, value, icon: Icon }) => (
                        <div key={label} className="flex items-center justify-between gap-3 text-[12px]">
                            <dt className="flex items-center gap-2 text-gray700"><Icon aria-hidden="true" className="text-success_deep" size={15} />{label}</dt>
                            <dd className="font-semibold text-secondary">{value}</dd>
                        </div>
                    ))}
                </dl>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <fieldset className="space-y-2.5">
                        <legend className="mb-3 text-sm font-semibold text-primary">Choose how you learn</legend>
                        {course.enrollmentOptions.map((option) => {
                            const isSelected = selectedMode === option.id;
                            const SelectionIcon = isSelected ? FiCheckCircle : FiCircle;

                            return (
                                <label key={option.id} className="block cursor-pointer">
                                    <input
                                        type="radio"
                                        name="courseMode"
                                        value={option.id}
                                        checked={isSelected}
                                        onChange={() => {
                                            setSelectedMode(option.id);
                                            setShowAvailability(false);
                                        }}
                                        className="peer sr-only"
                                    />
                                    <span className="block rounded-xl border border-[#dfe4dc] bg-white p-3 transition hover:border-success_deep/50 peer-checked:border-success_deep peer-checked:bg-[#f2f6ed] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-success_deep">
                                        <span className="flex items-center justify-between gap-2">
                                            <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                                                <SelectionIcon aria-hidden="true" size={16} className={isSelected ? "text-success_deep" : "text-gray700"} />
                                                {option.label}
                                            </span>
                                            <span className="text-[13px] font-bold text-success_deep">{formatPrice(option.price)}</span>
                                        </span>
                                        <span className="mt-1.5 block pl-6 text-[11px] leading-relaxed text-gray700">{option.description}</span>
                                    </span>
                                </label>
                            );
                        })}
                    </fieldset>
                    <div aria-live="polite" aria-atomic="true" className="flex items-center justify-between gap-2 border-b border-[#e5e7eb] pb-4 text-xs">
                        <span className="text-gray700">{selectedOption.label} course fee</span>
                        <span className="text-base font-bold text-primary">{formatPrice(selectedOption.price)}</span>
                    </div>
                    <div>
                        <label htmlFor="course-applicant-name" className="mb-1.5 block text-xs font-semibold">Full name <span aria-hidden="true" className="text-success_deep">*</span></label>
                        <input id="course-applicant-name" name="name" autoComplete="name" placeholder="Your full name" required className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="course-applicant-email" className="mb-1.5 block text-xs font-semibold">Email address <span aria-hidden="true" className="text-success_deep">*</span></label>
                        <input id="course-applicant-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="course-applicant-phone" className="mb-1.5 block text-xs font-semibold">Phone number <span aria-hidden="true" className="text-success_deep">*</span></label>
                        <input id="course-applicant-phone" name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" required className={inputClass} />
                    </div>
                    <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-success_deep px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-success_dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success_deep">
                        Apply {selectedOption.label.toLowerCase()} <FiArrowUpRight aria-hidden="true" size={18} />
                    </button>
                    {showAvailability && <p role="status" className="rounded-lg bg-success_light p-3 text-xs leading-relaxed text-success_deep">Applications are opening soon. Your details have not been submitted.</p>}
                </form>
                <p className="mt-4 text-center text-[11px] leading-relaxed text-gray700">Take the first step toward your next skill.</p>
            </div>
        </aside>
    );
}
