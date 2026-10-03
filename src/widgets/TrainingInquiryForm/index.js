"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiCheckCircle, FiFileText, FiSend, FiSettings, FiUploadCloud, FiUsers, FiX, FiZap } from "react-icons/fi";

import PhoneNumberInput from "@/components/PhoneNumber";
import Select from "@/components/Select";
import api from "@/config/api";

const trainingAreas = ["Software & Web Development", "Mobile App Development", "Artificial Intelligence & Machine Learning", "Data Analytics & Business Intelligence", "Automation, Embedded Systems & 4IR", "Cloud & Emerging Technologies", "Digital, Creative & Freelancing Skills", "Digital Literacy & Professional Skills"];
const participantRanges = ["1-20", "21-50", "51-100", "101-300", "301-500", "500+"];
const locations = ["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi", "Rangpur", "Barishal", "Mymensingh", "Multiple Locations", "On-site / At Your Premises"];
const trainingTypes = ["Government Training Project", "Institutional Training Program", "Corporate Upskilling", "Youth & Employability Program", "Specialized Technology Training", "Other"];

const acceptedExtensions = ["pdf", "doc", "docx", "ppt", "pptx", "zip"];

const validationSchema = Yup.object({
    organizationName: Yup.string().min(2, "Enter a valid organization or individual name").required("This field is required"),
    contactPerson: Yup.string().min(2, "Enter a valid contact person name").required("This field is required"),
    email: Yup.string().email("Enter a valid email address").required("This field is required"),
    phone: Yup.string()
        .test("valid-phone", "Enter a valid phone number", (value) => {
            const digits = (value || "").replace(/\D/g, "");
            return digits.length >= 10 && digits.length <= 15;
        })
        .required("This field is required"),
    trainingArea: Yup.string().required("Select a training area"),
    participants: Yup.string().required("Select the expected participant range"),
    preferredLocation: Yup.string().required("Select a preferred location"),
    trainingType: Yup.string().required("Select a training type"),
    details: Yup.string().min(20, "Please provide a little more detail").required("This field is required"),
    document: Yup.mixed()
        .nullable()
        .test("file-size", "The document must be 10 MB or smaller", (file) => !file || file.size <= 10 * 1024 * 1024)
        .test("file-type", "Use PDF, DOC, DOCX, PPT, PPTX or ZIP", (file) => !file || acceptedExtensions.includes(file.name.split(".").pop()?.toLowerCase())),
});

const inputClass = "min-h-12 w-full rounded-xl border border-divider bg-white px-4 py-3 text-sm text-secondary outline-none transition placeholder:text-gray500/55 hover:border-success_main/50 focus:border-success_main focus:ring-2 focus:ring-success_main/15";

const FieldError = ({ touched, error }) => (touched && error ? <p className="mt-1.5 text-xs text-error_main">{error}</p> : null);

const SelectField = ({ label, name, value, placeholder, options, formik }) => (
    <div>
        <label className="mb-2 block text-xs font-bold text-secondary md:text-sm">{label} <span className="text-error_main">*</span></label>
        <Select
            options={options.map((option) => ({ label: option, value: option }))}
            multipleValu={false}
            value={value}
            onChange={(selectedValue) => {
                formik.setFieldValue(name, selectedValue);
                formik.setFieldTouched(name, true, false);
            }}
            placeholder={placeholder}
            inputClass={`${inputClass} flex cursor-pointer items-center pr-11`}
        />
        <FieldError touched={formik.touched[name]} error={formik.errors[name]} />
    </div>
);

const supportItems = [
    { title: "Customized Programs", text: "Tailored training solutions based on your goals, industry needs and skill levels.", icon: FiSettings },
    { title: "Institutional Training Support", text: "Programs for schools, colleges, universities and workforce organizations.", icon: FiUsers },
    { title: "Fast Response & Consultation", text: "Practical guidance to help shape your training plan and proposal.", icon: FiZap },
];

const TrainingInquiryForm = () => {
    const fileInputRef = useRef(null);
    const [submitError, setSubmitError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const formik = useFormik({
        initialValues: {
            organizationName: "",
            contactPerson: "",
            email: "",
            phone: "",
            trainingArea: "",
            participants: "",
            preferredLocation: "",
            trainingType: "",
            details: "",
            document: null,
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setSubmitError("");
            setSubmitted(false);

            const description = [
                "Training Inquiry",
                `Organization / Individual: ${values.organizationName}`,
                `Training Area: ${values.trainingArea}`,
                `Expected Participants: ${values.participants}`,
                `Preferred Location: ${values.preferredLocation}`,
                `Training Type: ${values.trainingType}`,
                "",
                values.details,
            ].join("\n");

            const payload = new FormData();
            payload.append("name", values.contactPerson);
            payload.append("email", values.email);
            payload.append("mobile", values.phone);
            payload.append("companyName", values.organizationName);
            payload.append("description", description);
            payload.append("serviceIDs", JSON.stringify([]));
            if (values.document) payload.append("document", values.document);

            try {
                const response = await api.post("/api/add-contact", payload);
                if (response.data.status !== 200 && response.data.status !== 201) throw new Error(response.data.message || "Submission failed");

                resetForm();
                if (fileInputRef.current) fileInputRef.current.value = "";
                setSubmitted(true);
            } catch (error) {
                console.error("Failed to submit training inquiry:", error);
                setSubmitError("Unable to submit your training inquiry. Please try again.");
            }
        },
    });

    const handleDocumentChange = (event) => {
        formik.setFieldTouched("document", true, false);
        formik.setFieldValue("document", event.currentTarget.files?.[0] ?? null);
    };

    const removeDocument = () => {
        formik.setFieldValue("document", null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="relative overflow-hidden bg-[#F8F9FB] py-16 text-primary md:py-24">
            <div className="pointer-events-none absolute -left-28 top-24 h-80 w-80 rounded-full bg-success_main/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-success_main/10 blur-3xl" />

            <div className="container relative mx-auto max-w-xl px-4">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-success_deep md:text-sm">IT & Technical Training</p>
                    <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">Planning a Technical <span className="text-success_deep">Training Program?</span></h2>
                    <p className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-gray500 md:text-base">Whether you are planning an institutional training initiative, government-funded skill-development project, workforce upskilling program or specialized technology training, talk to our team about your requirements.</p>
                </div>

                <div className="mt-12 grid items-start gap-7 lg:grid-cols-[1.32fr_0.88fr]">
                    <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-xl md:p-8">
                        <div className="mb-7 flex items-start gap-4">
                            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-success_light text-success_deep"><FiFileText size={27} /></span>
                            <div>
                                <h3 className="text-xl font-extrabold text-primary md:text-2xl">Training Inquiry Form</h3>
                                <p className="mt-1 text-sm leading-6 text-gray500">Share your requirements and our team will prepare a tailored response.</p>
                            </div>
                        </div>

                        {submitted && (
                            <div className="mb-6 flex items-start gap-3 rounded-xl border border-success_main/25 bg-success_light p-4 text-sm text-success_deep" role="status">
                                <FiCheckCircle className="mt-0.5 shrink-0" size={20} />
                                <p><strong className="block">Training inquiry submitted.</strong> Our team will review your requirements and contact you.</p>
                            </div>
                        )}

                        <form onSubmit={formik.handleSubmit} className="grid gap-5 md:grid-cols-2" noValidate>
                            <div>
                                <label htmlFor="organizationName" className="mb-2 block text-xs font-bold text-secondary md:text-sm">Organization / Individual Name <span className="text-error_main">*</span></label>
                                <input id="organizationName" name="organizationName" value={formik.values.organizationName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Organization or individual name" className={inputClass} />
                                <FieldError touched={formik.touched.organizationName} error={formik.errors.organizationName} />
                            </div>

                            <div>
                                <label htmlFor="contactPerson" className="mb-2 block text-xs font-bold text-secondary md:text-sm">Contact Person <span className="text-error_main">*</span></label>
                                <input id="contactPerson" name="contactPerson" value={formik.values.contactPerson} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Contact person name" className={inputClass} />
                                <FieldError touched={formik.touched.contactPerson} error={formik.errors.contactPerson} />
                            </div>

                            <div>
                                <label htmlFor="trainingEmail" className="mb-2 block text-xs font-bold text-secondary md:text-sm">Email <span className="text-error_main">*</span></label>
                                <input id="trainingEmail" type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="you@example.com" className={inputClass} />
                                <FieldError touched={formik.touched.email} error={formik.errors.email} />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-bold text-secondary md:text-sm">Phone <span className="text-error_main">*</span></label>
                                <PhoneNumberInput name="phone" value={formik.values.phone} onChange={(value) => formik.setFieldValue("phone", value)} inputClass="min-h-12 rounded-xl border border-divider bg-white py-2 text-sm transition hover:border-success_main/50 focus-within:border-success_main focus-within:ring-2 focus-within:ring-success_main/15" />
                                <FieldError touched={formik.touched.phone} error={formik.errors.phone} />
                            </div>

                            <SelectField label="Training Area" name="trainingArea" value={formik.values.trainingArea} placeholder="Select training area" options={trainingAreas} formik={formik} />
                            <SelectField label="Expected Number of Participants" name="participants" value={formik.values.participants} placeholder="Select participant range" options={participantRanges} formik={formik} />
                            <SelectField label="Preferred Location" name="preferredLocation" value={formik.values.preferredLocation} placeholder="Select preferred location" options={locations} formik={formik} />
                            <SelectField label="Training Type" name="trainingType" value={formik.values.trainingType} placeholder="Select training type" options={trainingTypes} formik={formik} />

                            <div>
                                <label htmlFor="details" className="mb-2 block text-xs font-bold text-secondary md:text-sm">Project / Program Details <span className="text-error_main">*</span></label>
                                <textarea id="details" name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Training objectives, expected outcomes, timeline or other relevant details..." rows={6} className={`${inputClass} resize-none`} />
                                <FieldError touched={formik.touched.details} error={formik.errors.details} />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-bold text-secondary md:text-sm">Documents (if any)</label>
                                <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.zip" onChange={handleDocumentChange} className="sr-only" id="trainingDocument" />
                                <label htmlFor="trainingDocument" className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-success_main/50 bg-success_light/40 px-5 py-5 text-center transition hover:border-success_deep hover:bg-success_light">
                                    <FiUploadCloud className="text-success_deep" size={31} />
                                    <strong className="mt-2 text-sm text-secondary">Choose a document</strong>
                                    <span className="mt-1 text-[10px] leading-4 text-gray500">PDF, DOC, DOCX, PPT, PPTX or ZIP / Maximum 10 MB</span>
                                </label>
                                {formik.values.document && (
                                    <div className="mt-2 flex items-center justify-between gap-3 rounded-lg bg-[#F8F9FB] px-3 py-2 text-xs text-secondary">
                                        <span className="truncate">{formik.values.document.name}</span>
                                        <button type="button" onClick={removeDocument} aria-label="Remove selected document" className="shrink-0 text-error_main"><FiX /></button>
                                    </div>
                                )}
                                <FieldError touched={formik.touched.document} error={formik.errors.document} />
                            </div>

                            {submitError && <p className="text-sm text-error_main md:col-span-2" role="alert">{submitError}</p>}

                            <button type="submit" disabled={formik.isSubmitting} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-success_deep px-6 py-4 text-sm font-bold text-white transition hover:bg-success_main hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2 md:text-base">
                                <FiSend size={19} /> {formik.isSubmitting ? "Submitting..." : "Request a Training Proposal"}
                            </button>
                        </form>
                    </div>

                    <aside className="space-y-4 lg:sticky lg:top-28">
                        <div className="relative min-h-[390px] overflow-hidden rounded-3xl bg-success_light">
                            <Image src="/assets/images/it_Training/Software Development/WhatsApp Image 2023-11-30 at 10.18.36 AM.webp" alt="Instructor guiding participants during a technical training session" fill sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover" />
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(242,247,236,.96)_0%,rgba(242,247,236,.78)_42%,rgba(242,247,236,.08)_75%)]" />
                            <div className="absolute inset-y-0 left-0 flex w-[62%] flex-col justify-center p-7">
                                <p className="text-[10px] font-bold uppercase leading-5 tracking-[0.16em] text-success_deep">Empowering People<br />Strengthening Organizations</p>
                                <h3 className="mt-5 text-2xl font-extrabold leading-tight text-primary md:text-3xl">Practical Training for a Brighter Tomorrow</h3>
                                <span className="mt-4 h-1 w-16 bg-success_main" />
                                <p className="mt-4 text-xs leading-5 text-gray500">From foundational skills to advanced technology training, we build programs for real-world impact.</p>
                            </div>
                        </div>

                        {supportItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-lg">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success_light text-success_deep"><Icon size={22} /></span>
                                    <div><h4 className="text-sm font-extrabold text-primary md:text-base">{item.title}</h4><p className="mt-1 text-xs leading-5 text-gray500">{item.text}</p></div>
                                </div>
                            );
                        })}
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default TrainingInquiryForm;
