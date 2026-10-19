"use client";

import { useId, useState } from "react";
import { FiArrowUpRight, FiBookOpen, FiCalendar, FiClock, FiMapPin, FiMonitor, FiWatch, FiCheckCircle } from "react-icons/fi";
import { applyCourse } from "@/utilities/api";

const inputClass = "w-full rounded-lg border border-[#dfe4dc] bg-white px-3.5 py-3 text-sm text-secondary outline-none transition placeholder:text-gray700/60 focus:border-success_deep focus:ring-2 focus:ring-success_deep/10";
const formatPrice = (price) => {
    if (price === null || price === undefined || String(price).trim() === "") return "Contact for details";
    if (String(price).trim().toLowerCase() === "free") return "Free";
    const numericPrice = Number(String(price).replace(/,/g, ""));
    return `BDT ${Number.isFinite(numericPrice) ? new Intl.NumberFormat("en-BD").format(numericPrice) : price}`;
};

export default function ApplicationSidebar({ course, sidebarRef, embedded = false }) {
    const instanceId = useId();
    const applicationId = embedded ? `course-application-${instanceId}` : "course-application";
    const formId = `${applicationId}-form`;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

    const enrollmentOptions = Array.isArray(course?.enrollmentOptions) && course.enrollmentOptions.length > 0
        ? course.enrollmentOptions
        : [
            { id: "online", label: "Online", price: 8000, duration: "3 Months", classes: "24 classes", learningHours: "40 hours", classDuration: "2 hours", description: "Attend live from anywhere" },
            { id: "offline", label: "Offline", price: 12000, duration: "3 Months", classes: "24 classes", learningHours: "40 hours", classDuration: "2 hours", description: "Learn in our classroom" }
        ];

    const [selectedMode, setSelectedMode] = useState(enrollmentOptions[0]?.id || "offline");
    const selectedOption = enrollmentOptions.find((option) => option.id === selectedMode) || enrollmentOptions[0] || {};
    const details = [
        { label: "Duration", value: selectedOption.duration, icon: FiCalendar },
        { label: "Classes", value: selectedOption.classes, icon: FiBookOpen },
        { label: "Learning hours", value: selectedOption.learningHours, icon: FiClock },
        { label: "Class duration", value: selectedOption.classDuration, icon: FiWatch },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (submitError) setSubmitError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError("");
        setIsSubmitting(true);

        try {
            await applyCourse({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                courseID: course?.id || 3407,
                classID: selectedOption?.classTypeId || selectedOption?.id || 123456,
                type: selectedMode,
            });
            setSubmitSuccess(true);
            setFormData({ name: "", email: "", phone: "" });
        } catch (error) {
            console.error("Course application failed:", error);
            setSubmitError("Failed to submit application. Please try again or contact us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <aside id={applicationId} ref={sidebarRef} tabIndex={-1} aria-labelledby={`${applicationId}-title`} className={`scroll-mt-[90px] overflow-hidden rounded-2xl border border-[#dfe5d9] bg-white text-secondary shadow-[0_8px_32px_rgba(0,0,0,0.04)] focus:outline-none ${embedded ? "" : "lg:sticky lg:top-[120px] lg:scroll-mt-[120px]"}`}>
            <div className="border-b border-[#e3e9dd] bg-[#f2f6ed] px-6 py-5">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-success_deep">Your next step</p>
                <h2 id={`${applicationId}-title`} className="text-[22px] font-bold leading-tight tracking-[-0.025em] text-primary">Apply for this course</h2>
                {embedded && course?.title && <p className="mt-2 text-sm text-gray700">{course.title}</p>}
                <fieldset className={`mt-5 grid ${enrollmentOptions.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-2 rounded-xl border border-[#dfe5d9] bg-white/70 p-1.5`}>
                    <legend className="sr-only">Choose how you learn</legend>
                    {enrollmentOptions.map((option) => {
                        const ModeIcon = option.id === "online" ? FiMonitor : FiMapPin;

                        return (
                            <label key={option.id} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name={`${applicationId}-mode`}
                                    form={formId}
                                    value={option.id}
                                    checked={selectedMode === option.id}
                                    onChange={() => {
                                        setSelectedMode(option.id);
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
                        {details.filter(({ value }) => value !== null && value !== undefined && value !== "").map(({ label, value, icon: Icon }) => (
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
                <form id={formId} onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor={`${formId}-name`} className="mb-1.5 block text-xs font-semibold">Full name <span aria-hidden="true" className="text-success_deep">*</span></label>
                        <input id={`${formId}-name`} name="name" value={formData.name} onChange={handleChange} autoComplete="name" placeholder="Your full name" required className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor={`${formId}-email`} className="mb-1.5 block text-xs font-semibold">Email address <span aria-hidden="true" className="text-success_deep">*</span></label>
                        <input id={`${formId}-email`} name="email" value={formData.email} onChange={handleChange} type="email" autoComplete="email" placeholder="you@example.com" required className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor={`${formId}-phone`} className="mb-1.5 block text-xs font-semibold">Phone number <span aria-hidden="true" className="text-success_deep">*</span></label>
                        <input id={`${formId}-phone`} name="phone" value={formData.phone} onChange={handleChange} type="tel" autoComplete="tel" placeholder="Your phone number" required className={inputClass} />
                    </div>
                    {submitError && (
                        <p role="alert" className="rounded-lg bg-red-50 p-3 text-xs leading-relaxed text-error_main border border-red-200">
                            {submitError}
                        </p>
                    )}
                    {submitSuccess && (
                        <div role="status" className="flex items-start gap-2 rounded-lg bg-success_light p-3 text-xs leading-relaxed text-success_deep border border-success_main/20">
                            <FiCheckCircle className="shrink-0 mt-0.5 text-success_deep" size={15} />
                            <span>Your application has been submitted successfully! We will contact you soon.</span>
                        </div>
                    )}
                    <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-lg bg-success_deep px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-success_dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success_deep disabled:opacity-70 disabled:cursor-not-allowed">
                        {isSubmitting ? "Submitting..." : `Apply ${selectedOption.label.toLowerCase()}`} {!isSubmitting && <FiArrowUpRight aria-hidden="true" size={18} />}
                    </button>
                </form>
                <p className="mt-4 text-center text-[11px] leading-relaxed text-gray700">Take the first step toward your next skill.</p>
            </div>
        </aside>
    );
}
