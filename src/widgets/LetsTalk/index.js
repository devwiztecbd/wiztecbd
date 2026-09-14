"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaCheck } from "react-icons/fa";

import PhoneNumberInput from "@/components/PhoneNumber";
import Modal from "@/components/Modal";
import DatePicker from "@/components/DatePicker";
import ImageURL from "@/components/ImageUrl";
import { clients } from "@/app/staticData/data";
import api from "@/config/api";
import axios from "axios";

const LetsTalk = ({ isOpen, onClose }) => {
    const [services, setServices] = useState([]);
    const [tab, setTab] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isWarning, setIsWarning] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const successTimerRef = useRef(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get("/api/get-services?index=contact-service");
                if (response.data.status === 200) {
                    const dynamicServices = response.data.services.map((service) => ({
                        id: service.id,
                        label: service.name,
                    }));
                    setServices(dynamicServices);
                }
            } catch (error) {
                console.error("Failed to fetch services:", error);
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        return () => clearTimeout(successTimerRef.current);
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            number: "",
            email: "",
            company: "",
            stuffNumber: "",
            website: "",
            descrition: "",
            dateTime: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().min(4, "Must be 4 characters or more").required("The field is required."),
            number: Yup.string()
                .test("valid-phone-number", "Enter a valid phone number", (value) => {
                    const digits = (value || "").replace(/\D/g, "");
                    return digits.length >= 10 && digits.length <= 15;
                })
                .required("Phone number is required"),
            email: Yup.string().email("Invalid email address").required("The field is required."),
        }),
        onSubmit: async (values, { resetForm }) => {
            setSubmitError("");

            try {
                let formattedDate = "";
                let formattedTime = "";
                if (values.dateTime instanceof Date) {
                    const dt = values.dateTime;
                    formattedDate = dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
                    const hours = dt.getHours();
                    const ampm = hours >= 12 ? "PM" : "AM";
                    const hours12 = hours % 12 || 12;
                    formattedTime = `${String(hours12).padStart(2, "0")}:${String(dt.getMinutes()).padStart(2, "0")} ${ampm}`;
                } else if (values.dateTime) {
                    const dt = new Date(values.dateTime);
                    if (!isNaN(dt.getTime())) {
                        formattedDate = dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
                        const hours = dt.getHours();
                        const ampm = hours >= 12 ? "PM" : "AM";
                        const hours12 = hours % 12 || 12;
                        formattedTime = `${String(hours12).padStart(2, "0")}:${String(dt.getMinutes()).padStart(2, "0")} ${ampm}`;
                    }
                }


                const payload = new URLSearchParams();
                payload.append("name", values.name);
                payload.append("email", values.email);
                payload.append("mobile", values.number);
                payload.append("companyName", values.company);
                payload.append("companyWebsite", values.website);
                payload.append("description", values.descrition);
                payload.append("date", formattedDate);
                payload.append("time", formattedTime);
                payload.append("serviceIDs", JSON.stringify(tab));

                const response = await axios.post(`${api.defaults.baseURL}/api/add-contact`, payload, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "x-api-key": api.defaults.headers["x-api-key"],
                    },
                });

                if (response.data.status === 200 || response.data.status === 201) {
                    setIsSubmit(true);
                    successTimerRef.current = setTimeout(() => {
                        setIsSuccess(true);
                    }, 200);
                    resetForm();
                    setTab([]);
                } else {
                    setSubmitError(response.data.message || "Unable to submit your request. Please try again.");
                }
            } catch (error) {
                console.error("Failed to submit contact form:", error);
                setSubmitError("Unable to submit your request. Please try again.");
            }
        },
    });

    const resetFormState = () => {
        clearTimeout(successTimerRef.current);
        setIsSubmit(false);
        setIsSuccess(false);
        setIsWarning(false);
        setSubmitError("");
        setTab([]);
        formik.resetForm();
    };

    const handleModalClose = () => {
        resetFormState();
        onClose();
    };

    const handleToggle = (id) => {
        setIsWarning(false);
        if (tab.includes(id)) {
            setTab(tab.filter((tabId) => tabId !== id));
        } else {
            setTab([...tab, id]);
        }
    };

    const handleWarning = () => {
        if (tab.length == 0) {
            setIsWarning(true);
        }
    };

    return (
        <>
            <Modal width={1234} isOpen={isOpen} onClose={handleModalClose} title={"Ready to Start the Journey with WiztecBD?\nHow can we help you?"}>
                <div className=" grid md:grid-cols-2 grid-cols-1 md:space-x-4">
                    <div className=" col-span-1 mb-6 md:mb-0">
                        <h6 className=" text-H6 text-center my-6 font-bold">Trusted by</h6>
                        <div className=" grid grid-cols-4 gap-x-4 gap-y-8 h-370 md:h-auto overflow-y-auto md:overflow-hidden scrollbar">
                            {clients.map((logo, index) => (
                                <div key={index} className="flex items-center  justify-center md:h-8 h-6 hover:scale-110 transition-transform duration-300">
                                    <ImageURL image={logo} alt="client logo" height={48} width={150} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`${isSubmit ? "hidden" : "block"} col-span-1 md:px-8 md:py-5 mt-6 bg-white rounded-lg md:shadow-lg`}>
                        <h3 className="text-H6 text-center font-bold mb-2">I’m Looking For</h3>
                        <p className=" text-subtitle2 mb-2 text-center">{"[ Please select your area of interest below ]"}</p>
                        <div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-4 mb-4">
                                {services.map((tabData) => (
                                    <div key={tabData.id} onClick={() => handleToggle(tabData.id)} className={`group col-span-1 md:px-4 md:pt-2 p-2 relative rounded-lg cursor-pointer ${tab.includes(tabData.id) ? "bg-success_main text-white" : "bg-secondary_bg text-primary"}`}>
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <p className="text-subtitle2 font-medium hidden md:block">{tabData.label.length > 25 ? tabData.label.slice(0, 25) + "..." : tabData.label}</p>
                                            <p className="text-subtitle2 font-medium md:hidden">{tabData.label.length > 20 ? tabData.label.slice(0, 20) + ".." : tabData.label}</p>
                                            <FaCheck size={12} className={`text-white ${tab.includes(tabData.id) ? "opacity-100" : "opacity-0"}`} />
                                        </div>
                                        <div className={`hidden md:flex absolute bottom-1 ${!tab.includes(tabData.id) ? "bg-success_main" : "bg-transparent"} h-2px bg-success_main transition-width duration-300 ease-in-out w-0 group-hover:w-3/4`}></div>
                                    </div>
                                ))}
                            </div>
                            {/* <div className=" grid grid-cols-2 gap-x-2 gap-y-4 mb-4">
                                {services.map((tabData) => (
                                    <div key={tabData.id} onClick={() => setTab(tabData.id)} className={`group col-span-1  md:px-4 md:pt-2 p-2 relative rounded-lg cursor-pointer ${tab == tabData.id ? "bg-success_main text-white" : "bg-secondary_bg text-primary"}`}>
                                        <div className=" flex items-center gap-2 whitespace-nowrap">
                                            <p className=" text-subtitle2 font-medium hidden md:block">
                                                {tabData.label.length > 25 ? tabData.label.slice(0, 25) : tabData.label} {tabData.label.length > 25 ? "..." : ""}{" "}
                                            </p>
                                            <p className=" text-subtitle2 font-medium md:hidden">
                                                {tabData.label.length > 20 ? tabData.label.slice(0, 20) : tabData.label} {tabData.label.length > 20 ? ".." : ""}{" "}
                                            </p>
                                            <FaCheck size={12} className={`text-white ${tab == tabData.id ? " opacity-100" : " opacity-0"}`} />
                                        </div>
                                        <div className={` hidden md:flex absolute bottom-1 ${tab !== tabData.id ? "bg-success_main" : "bg-transparent"} h-2px bg-success_main transition-width duration-300 ease-in-out w-0 group-hover:w-3/4`}></div>
                                    </div>
                                ))}
                            </div> */}

                            {isWarning && <p className=" text-error_main text-center my-1">Please Choose Service!</p>}
                            <form onSubmit={formik.handleSubmit} onClick={handleWarning} className={` ${tab.length !== 0 ? "opacity-100" : " opacity-40"}`}>
                                <div className={`grid grid-cols-2 gap-x-2 md:gap-y-6 gap-y-4 md:mb-10 mb-6 `}>
                                    <div className=" col-span-2 flex flex-col ">
                                        <label htmlFor="name" className="font-semibold mb-2">
                                            Your name*
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            readOnly={tab.length !== 0 ? false : true}
                                            onChange={formik.handleChange}
                                            value={formik.values.name}
                                            placeholder="Your Full name"
                                            className={` ${tab.length !== 0 ? "focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input" : "focus:ring-none focus:ring-none"} px-4 py-2 bg-transparent rounded-lg focus:outline-none ring-1 ring-success_main  focus:border-transparent`}
                                        />
                                        {formik.touched.name && formik.errors.name && <div className="text-subtitle2 mt-1 text-error_main">{formik.errors.name}</div>}
                                    </div>

                                    <div className=" col-span-1 flex flex-col ">
                                        <label htmlFor="email" className="font-semibold mb-2">
                                            Email*
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            readOnly={tab.length !== 0 ? false : true}
                                            placeholder="Your Email Address"
                                            className={` ${tab.length !== 0 ? "focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input" : "focus:ring-none focus:ring-none"} px-4 py-2 bg-transparent rounded-lg focus:outline-none ring-1 ring-success_main  focus:border-transparent`}
                                        />
                                        {formik.touched.email && formik.errors.email ? <div className=" text-subtitle2 mt-1 text-error_main">{formik.errors.email}</div> : null}
                                    </div>
                                    <div className=" col-span-1 flex flex-col justify-between ">
                                        <PhoneNumberInput
                                            disabled={tab.length !== 0 ? false : true}
                                            name="number"
                                            label={" Mobile phone*"}
                                            value={formik.values.number}
                                            onChange={(number) => formik.setFieldValue("number", number)}
                                            inputClass={` ${tab.length !== 0 ? "focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input" : "focus:ring-none focus:ring-none"} px-4 py-[5px] bg-transparent rounded-lg focus:outline-none ring-1 ring-success_main  focus:border-transparent`}
                                        />
                                        {formik.touched.number && formik.errors.number ? <div className=" text-subtitle2 mt-1 text-error_main">{formik.errors.number}</div> : null}
                                    </div>
                                    <div className=" col-span-1 flex flex-col ">
                                        <label htmlFor="company" className="font-semibold mb-2">
                                            Company name
                                        </label>
                                        <input
                                            name="company"
                                            type="text"
                                            placeholder="Company Name"
                                            onChange={formik.handleChange}
                                            value={formik.values.company}
                                            readOnly={tab.length !== 0 ? false : true}
                                            className={` ${tab.length !== 0 ? "focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input" : "focus:ring-none focus:ring-none"} px-4 py-2 bg-transparent rounded-lg focus:outline-none ring-1 ring-success_main  focus:border-transparent`}
                                        />
                                    </div>
                                    <div className=" col-span-1 flex flex-col ">
                                        <label htmlFor="website" className="font-semibold mb-2">
                                            Company website
                                        </label>
                                        <input
                                            name="website"
                                            type="text"
                                            readOnly={tab.length !== 0 ? false : true}
                                            onChange={formik.handleChange}
                                            value={formik.values.website}
                                            placeholder="Company website"
                                            className={` ${tab.length !== 0 ? "focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input" : "focus:ring-none focus:ring-none"} px-4 py-2 bg-transparent rounded-lg focus:outline-none ring-1 ring-success_main  focus:border-transparent`}
                                        />
                                    </div>

                                    <div className=" col-span-2 ">
                                        <DatePicker
                                            isDisabled={tab.length === 0}
                                            label={"Date and Time"}
                                            onChange={(value) => formik.setFieldValue("dateTime", value)}
                                            value={formik.values.dateTime}
                                            placeholder={"Select Date and Time"}
                                            inputClass={`custom-input !px-4 ${tab.length !== 0 ? "focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input" : "focus:ring-none focus:ring-none"} px-4 py-2 !bg-transparent rounded-lg focus:outline-none ring-1 ring-success_main `}
                                        />

                                    </div>

                                    <div className=" col-span-2 flex flex-col ">
                                        <label htmlFor="requirements" className="font-semibold mb-2">
                                            Briefly describe your requirements
                                        </label>
                                        <textarea
                                            readOnly={tab.length !== 0 ? false : true}
                                            name="descrition"
                                            type="text"
                                            onChange={formik.handleChange}
                                            value={formik.values.descrition}
                                            placeholder="Start Typeing here"
                                            className={` ${tab.length !== 0 ? "focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input" : "focus:ring-none focus:ring-none"} px-4 py-2 bg-transparent rounded-lg focus:outline-none ring-1 ring-success_main   focus:border-transparent `}
                                        />
                                        {formik.touched.descrition && formik.errors.descrition ? <div className=" text-subtitle2 mt-1 text-error_main">{formik.errors.descrition}</div> : null}
                                    </div>
                                </div>
                                {submitError && <p className="mb-3 text-sm text-error_main" role="alert">{submitError}</p>}
                                <button type="submit" disabled={tab.length === 0 || formik.isSubmitting} className={`${tab.length !== 0 && " hover-bg-left-to-right hover:text-primary"} capitalize bg-primary text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 md:px-6 md:py-10px px-6 py-2 transition-all duration-500`}>
                                    <span>{formik.isSubmitting ? "Sending..." : "Submit & Schedule a Meeting"}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                    {isSubmit && (
                        <div className="pl-12 flex flex-col items-center justify-center">
                            <div className=" flex items-center justify-center h-3/4">
                                <div className=" bg-white shadow-lg mx-4 md:mx-0 flex flex-col p-6 relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50" className="mx-auto">
                                        <circle cx="50" cy="50" r="45" className={`circle ${isSuccess ? "filled" : ""}`} stroke={isSuccess ? "#8BC43F" : "transparent"}></circle>
                                        <path d="M 30 50 L 45 65 L 70 35" className={`checkmark ${isSuccess ? "show" : ""}`} stroke={isSuccess ? "#8BC43F" : "transparent"} fill="none" strokeWidth="5" strokeLinecap="round"></path>
                                    </svg>
                                    <div className="my-4 space-y-4">
                                        <h5 className="  text-H5 font-semibold text-center">Successfully Submitted</h5>
                                        <p className="text-center text-subtitle2">Your requirement has been submitted successfully. Thank you for considering WiztecBD with service.</p>
                                        <p className="text-center text-subtitle2 font-semibold">We will email you a quotation.</p>
                                    </div>
                                    <div className=" flex items-center justify-center">
                                        <button type="button" onClick={resetFormState} className=" px-6 py-2 bg-primary text-white text-subtitle2 leading-4">
                                            <span>Send another request</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default LetsTalk;
