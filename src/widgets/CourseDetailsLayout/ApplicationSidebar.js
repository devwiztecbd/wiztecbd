"use client";

import { useState } from "react";
import { FiArrowUpRight, FiBookOpen, FiCalendar, FiClock, FiMapPin, FiMonitor, FiWatch } from "react-icons/fi";

const inputClass = "w-full rounded-lg border border-[#dfe4dc] bg-white px-3.5 py-3 text-sm text-secondary outline-none transition placeholder:text-gray700/60 focus:border-success_deep focus:ring-2 focus:ring-success_deep/10";
const formatPrice = (price) => `BDT ${new Intl.NumberFormat("en-BD").format(price)}`;

export default function ApplicationSidebar({ course, sidebarRef }) {
    const [showAvailability, setShowAvailability] = useState(false);
    const [selectedMode, setSelectedMode] = useState(course.enrollmentOptions[0].id);
    const selectedOption = course.enrollmentOptions.find((option) => option.id === selectedMode);
    const details = [
        { label: "Duration", value: selectedOption.duration, icon: FiCalendar },
        { label: "Classes", value: selectedOption.classes, icon: FiBookOpen },
        { label: "Learning hours", value: selectedOption.learningHours, icon: FiClock },
        { label: "Class duration", value: selectedOption.classDuration, icon: FiWatch },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        // The design preview has no submission integration yet.
        setShowAvailability(true);
    };

    return (
        <aside id="course-application" ref={sidebarRef} tabIndex={-1} aria-labelledby="course-application-title" className="scroll-mt-[90px] overflow-hidden rounded-2xl border border-[#dfe5d9] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.04)] focus:outline-none lg:sticky lg:top-[120px] lg:scroll-mt-[120px]">
            <div className="border-b border-[#e3e9dd] bg-[#f2f6ed] px-6 py-5">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-success_deep">Your next step</p>
                <h2 id="course-application-title" className="text-[22px] font-bold leading-tight tracking-[-0.025em] text-primary">Apply for this course</h2>
                <fieldset className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-[#dfe5d9] bg-white/70 p-1.5">
                    <legend className="sr-only">Choose how you learn</legend>
                    {course.enrollmentOptions.map((option) => {
                        const ModeIcon = option.id === "online" ? FiMonitor : FiMapPin;

                        return (
                            <label key={option.id} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="courseMode"
                                    form="course-application-form"
                                    value={option.id}
                                    checked={selectedMode === option.id}
                                    onChange={() => {
                                        setSelectedMode(option.id);
                                        setShowAvailability(false);
                                    }}
                                    className="peer sr-only"
                                />
                                <span className="flex flex-col items-center gap-1.5 rounded-lg border border-transparent px-2 py-3 text-gray700 transition-colors hover:bg-[#f2f6ed] peer-checked:border-success_deep/20 peer-checked:bg-success_deep peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-success_deep">
                                    <span className="flex items-center gap-1.5 text-sm font-semibold"><ModeIcon aria-hidden="true" size={14} />{option.label}</span>
                                    <span className="text-[11px] font-semibold">{formatPrice(option.price)}</span>
                                </span>
                            </label>
                        );
                    })}
                </fieldset>
                <p className="mt-3 text-center text-[11px] text-gray700">{selectedOption.description}</p>
            </div>

            <div className="px-6 py-6">
                <div aria-live="polite" aria-atomic="true" className="mb-6 border-b border-[#e5e7eb] pb-5">
                    <dl className="space-y-3.5">
                        {details.map(({ label, value, icon: Icon }) => (
                            <div key={label} className="flex items-center justify-between gap-3 text-[12px]">
                                <dt className="flex items-center gap-2 text-gray700"><Icon aria-hidden="true" className="text-success_deep" size={15} />{label}</dt>
                                <dd className="font-semibold text-secondary">{value}</dd>
                            </div>
                        ))}
                    </dl>
                    <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#e5e7eb] pt-4 text-xs">
                        <span className="text-gray700">{selectedOption.label} course fee</span>
                        <span className="text-base font-bold text-primary">{formatPrice(selectedOption.price)}</span>
                    </div>
                </div>
                <form id="course-application-form" onSubmit={handleSubmit} className="space-y-4">
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
