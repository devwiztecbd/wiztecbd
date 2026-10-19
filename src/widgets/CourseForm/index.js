"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoHourglassOutline } from "react-icons/io5";
import { MdAirlineSeatReclineNormal, MdCalendarToday, MdClass, MdTimer } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "@/components/Button";
import PhoneNumberInput from "@/components/PhoneNumber";
import Modal from "@/components/Modal";
import useModal from "@/hooks/useModal";
import { applyCourse } from "@/utilities/api";
import { isValidURL, Popup } from "../IntroDesign";

const formatCoursePrice = (price) => {
    if (price === null || price === undefined) return "Contact";
    const normalized = String(price).trim();
    if (normalized === "") return "Contact";
    if (normalized.toLowerCase() === "free") return "Free";
    return `BDT ${normalized}`;
};

const EDUCATION_LEVEL_OPTIONS = ["SSC", "HSC", "Diploma", "Bachelor's Running", "Bachelor's Completed", "Master's Running", "Master's Completed"];
const OCCUPATION_OPTIONS = ["Student", "Job Seeker", "Freelancer", "Intern", "Part-Time Employee", "Full-Time Employee", "Business Owner", "Teacher", "Government Employee", "Unemployed", "Other"];

const CourseForm = ({ courseID, status = "offline", facilities, link, linkText, price }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const { isOpen: isSuccess, openModal: openSuccess, closeModal: closeSuccess } = useModal();
    const { isOpen, openModal, closeModal } = useModal();

    // submit modal
    const handleClose = () => {
        closeModal();
        closeSuccess();
        setSubmitError("");
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
            gender: "",
            education_level: "",
            current_occupation: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().min(4, "Must be 4 characters or more").required("The field is required."),
            number: Yup.string()
                .matches(/^[0-9]{13}$/, "Phone number must be exactly 10 digits")
                .required("Phone number is required"),
            email: Yup.string().email("Invalid email address").required("The field is required."),
            gender: Yup.string().oneOf(["male", "female", "other", "prefer_not_to_say"], "Invalid gender value").required("Gender is required"),
            education_level: Yup.string().required("Education level is required"),
            current_occupation: Yup.string().required("Current occupation is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            setSubmitError("");
            try {
                await applyCourse({
                    name: values.name,
                    email: values.email,
                    phone: values.number,
                    courseID: courseID,
                    gender: values.gender,
                    education_level: values.education_level,
                    current_occupation: values.current_occupation,
                });
                openModal();
                setTimeout(() => {
                    openSuccess();
                }, 200);
                resetForm();
            } catch (err) {
                setSubmitError("Submission failed. Please try again.");
            }
        },
    });

    const handleClick = (e) => {
        if (!isValidURL(link)) {
            e.preventDefault();
            setShowPopup(true);
        }
    };

    return (
        <>
            {showPopup && <Popup message={link} onClose={() => setShowPopup(false)} />}
            <div className="md:p-6 p-4 bg-white w-full md:sticky md:top-24">
                <div className=" flex items-center justify-between mb-4 py-1">
                    <p className=" font-bold text-subtitle1 ">Course Summary</p>
                    <div className={`flex items-center gap-2 px-2 py-1 border ${status == "online" ? "border-success_main" : " border-divider"}`}>
                        <div className={`${status == "online" ? "bg-success_main" : " bg-divider"} h-2 w-2  rounded-full`}></div>
                        <p className=" font-medium text-subtitle2 capitalize">{status}</p>
                    </div>
                </div>
                <div className="mb-4 rounded-lg border-2 border-success_main bg-success_main/10 px-4 py-3 shadow-md">
                    <p className="text-subtitle2 font-semibold uppercase tracking-wide text-success_main">Course Fee</p>
                    <p className="text-H5 font-bold text-success_main">{formatCoursePrice(price)}</p>
                </div>
                <div className=" flex flex-col gap-4">
                    <div className=" flex gap-12">
                        <div className=" flex flex-col gap-2">
                            <div className=" flex gap-2">
                                <span className="rounded-full border mb-auto border-divider p-1 h-auto">
                                    <IoHourglassOutline size={18} className=" text-success_main" />
                                </span>
                                <div className=" flex flex-col">
                                    <p className="text-subtitle2 mb-1 font-medium"> Hour</p>
                                    <p className=" text-body2 font-medium">{facilities.houre}</p>
                                </div>
                            </div>
                            <div className=" flex gap-2">
                                <span className="rounded-full border mb-auto border-divider p-1 h-auto">
                                    <MdClass size={18} className=" text-success_main" />
                                </span>

                                {facilities.classes && (
                                    <div className=" flex flex-col">
                                        <p className="text-subtitle2 mb-1 font-medium">Classes</p>

                                        <p className=" text-body2 font-medium">{facilities.classes}</p>
                                    </div>
                                )}
                                {facilities.class && (
                                    <div className=" flex flex-col">
                                        <p className="text-subtitle2 mb-1 font-medium">Class</p>

                                        <p className=" text-body2 font-medium">{facilities.class}</p>
                                    </div>
                                )}
                            </div>
                            <div className=" flex gap-2">
                                <span className="rounded-full border mb-auto border-divider p-1 ">
                                    <MdAirlineSeatReclineNormal size={18} className=" text-success_main" />
                                </span>
                                <div className=" flex flex-col">
                                    <p className="text-subtitle2  font-medium">Seats</p>
                                    <p className=" text-body2 font-medium">{facilities.seats}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col gap-2">
                            <div className=" flex gap-2">
                                <span className="rounded-full border mb-auto border-divider p-1 h-auto">
                                    <MdTimer size={18} className=" text-success_main" />
                                </span>
                                <div className=" flex flex-col">
                                    <p className="text-subtitle2 mb-1 font-medium"> Time</p>
                                    <p className=" text-body2 font-medium">{facilities.time}</p>
                                </div>
                            </div>
                            <div className=" flex gap-2">
                                <span className="rounded-full border mb-auto border-divider p-1 h-auto">
                                    <MdCalendarToday size={18} className=" text-success_main" />
                                </span>
                                <div className=" flex flex-col">
                                    <p className="text-subtitle2 mb-1 font-medium">Day</p>
                                    <p className="text-subtitle2  font-medium whitespace-normal">{facilities.day}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {link ? (
                        <Link href={isValidURL(link) ? link : "#"} onClick={handleClick} target="_blanck" className=" px-4 py-2 bg-black text-white flex items-center justify-center">
                            {linkText}
                        </Link>
                    ) : (
                        <form onSubmit={formik.handleSubmit}>
                            <div className=" flex flex-col mb-4">
                                <label htmlFor="name" className="font-semibold mb-2">
                                    Name*
                                </label>
                                <input onChange={formik.handleChange} value={formik.values.name} placeholder="Your Full name" type="text" name="name" className={`focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input px-4 py-2  bg-white rounded-lg focus:outline-none ring-1 ring-success_main   focus:border-transparent`} />
                                <div className={`${formik.touched.name && formik.errors.name ? "opacity-100" : "opacity-0"} text-subtitle2 mt-1 text-error_main`}>{formik.errors.name}</div>
                            </div>
                            <div className=" flex flex-col my-4">
                                <label htmlFor="email" className="font-semibold mb-2">
                                    Email*
                                </label>
                                <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Your Email Address" className={`focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input px-4 py-2  bg-white rounded-lg focus:outline-none ring-1 ring-success_main  focus:border-transparent`} />
                                <div className={`${formik.touched.email && formik.errors.email ? "opacity-100" : "opacity-0"} text-subtitle2 mt-1 text-error_main`}>{formik.errors.email}</div>
                            </div>
                            <div className=" flex flex-col my-4">
                                <label htmlFor="gender" className="font-semibold mb-2">
                                    Gender*
                                </label>
                                <select name="gender" onChange={formik.handleChange} value={formik.values.gender} className="focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input px-4 py-2 bg-white rounded-lg focus:outline-none ring-1 ring-success_main focus:border-transparent">
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer_not_to_say">Prefer not to say</option>
                                </select>
                                <div className={`${formik.touched.gender && formik.errors.gender ? "opacity-100" : "opacity-0"} text-subtitle2 mt-1 text-error_main`}>{formik.errors.gender}</div>
                            </div>
                            <div className=" flex flex-col my-4">
                                <label htmlFor="education_level" className="font-semibold mb-2">
                                    Education level*
                                </label>
                                <select name="education_level" onChange={formik.handleChange} value={formik.values.education_level} className="focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input px-4 py-2 bg-white rounded-lg focus:outline-none ring-1 ring-success_main focus:border-transparent">
                                    <option value="">Select education level</option>
                                    {EDUCATION_LEVEL_OPTIONS.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className={`${formik.touched.education_level && formik.errors.education_level ? "opacity-100" : "opacity-0"} text-subtitle2 mt-1 text-error_main`}>{formik.errors.education_level}</div>
                            </div>
                            <div className=" flex flex-col my-4">
                                <label htmlFor="current_occupation" className="font-semibold mb-2">
                                    Current occupation*
                                </label>
                                <select name="current_occupation" onChange={formik.handleChange} value={formik.values.current_occupation} className="focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input px-4 py-2 bg-white rounded-lg focus:outline-none ring-1 ring-success_main focus:border-transparent">
                                    <option value="">Select current occupation</option>
                                    {OCCUPATION_OPTIONS.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className={`${formik.touched.current_occupation && formik.errors.current_occupation ? "opacity-100" : "opacity-0"} text-subtitle2 mt-1 text-error_main`}>{formik.errors.current_occupation}</div>
                            </div>

                            <div className="flex flex-col justify-between mb-8">
                                <PhoneNumberInput name="number" label={"Mobile phone*"} value={formik.values.number} onChange={(val) => formik.setFieldValue("number", val)} inputClass={`focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input px-4 py-[5px]  bg-white rounded-lg focus:outline-none ring-1 ring-success_main   focus:border-transparent`} />
                                {formik.touched.number && formik.errors.number ? <div className=" text-subtitle2 mt-1 text-error_main">{formik.errors.number}</div> : null}
                            </div>
                            {submitError && <div className="text-subtitle2 mb-2 text-error_main">{submitError}</div>}
                            <div className=" mb-4 flex justify-end">
                                <Button type="submit" size="small" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? "Submitting..." : "submit"}
                                </Button>
                            </div>
                            <p className=" text-subtitle2">
                                By submitting this form, you agree to our
                                <Link href="#" target="blank" className=" text-success_main underline font-bold">
                                    Privacy Policy
                                </Link>
                            </p>
                        </form>
                    )}
                </div>
            </div>
            <Modal width={500} isOpen={isOpen} onClose={handleClose}>
                <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50" className="mx-auto">
                        <circle cx="50" cy="50" r="45" className={`circle ${isSuccess ? "filled" : ""}`} stroke={isSuccess ? "#8BC43F" : "transparent"}></circle>
                        <path d="M 30 50 L 45 65 L 70 35" className={`checkmark ${isSuccess ? "show" : ""}`} stroke={isSuccess ? "#8BC43F" : "transparent"} fill="none" strokeWidth="5" strokeLinecap="round"></path>
                    </svg>
                    <div className="my-4 space-y-4">
                    <h5 className="text-H5 font-semibold text-center">Application Submitted</h5>
                    <p className="text-center text-subtitle2">
                        Your application for the course has been submitted successfully.
                    </p>
                    <p className="text-center text-subtitle2 font-semibold">
                        We’ll review it and get back to you via email soon.
                    </p>
                    </div>
                    <div className=" flex items-center justify-center">
                        <Button size="small" onClick={handleClose}>
                            Ok !
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CourseForm;
