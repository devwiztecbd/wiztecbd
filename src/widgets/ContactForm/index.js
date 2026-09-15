"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import ScrollAnimatedSection from "@/components/ScrollAnimationSection";
import Button from "@/components/Button";
import Select from "@/components/Select";
import PhoneNumberInput from "@/components/PhoneNumber";
import DatePicker from "@/components/DatePicker";
import Modal from "@/components/Modal";
import useModal from "@/hooks/useModal";
import { useEffect } from "react";
import api from "@/config/api";
import axios from "axios";

const ContactForm = () => {
    const [services, setServices] = useState([]);
    const [selectValue, setSelectValue] = useState([]);
    const { isOpen: isSuccess, openModal: openSuccess, closeModal: closeSuccess } = useModal();
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get("/api/get-services?index=contact-service");
                if (response.data.status === 200) {
                    const dynamicOptions = response.data.services.map((service) => ({
                        label: service.name,
                        value: service.id,
                    }));
                    setServices([...dynamicOptions, { label: "Other", value: "Other" }]);
                }
            } catch (error) {
                console.error("Failed to fetch services:", error);
            }
        };

        fetchServices();
    }, []);

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(4, "Must be 4 characters or more").required("The field is required."),
        number: Yup.string()
            .matches(/^[0-9]{13}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
        email: Yup.string().email("Invalid email address").required("The field is required."),
    });

    // Initialize Formik with useFormik hook
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
            number: "",
            dateTime: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
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
                payload.append("description", values.message);
                payload.append("date", formattedDate);
                payload.append("time", formattedTime);

                // Handle multiple select IDs
                const validServiceIDs = selectValue.filter(id => id !== "Other");
                payload.append("serviceIDs", JSON.stringify(validServiceIDs));

                const response = await axios.post(`${api.defaults.baseURL}/api/add-contact`, payload, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "x-api-key": api.defaults.headers["x-api-key"],
                    },
                });

                if (response.data.status === 200 || response.data.status === 201) {
                    openModal();
                    setTimeout(() => {
                        openSuccess();
                    }, 200);
                    resetForm();
                    setSelectValue([]);
                }
            } catch (error) {
                console.error("Failed to submit contact form:", error);
            }
        },
    });

    const handleClose = () => {
        closeModal();
        closeSuccess();
    };
    return (
        <>
            <div>
                <ScrollAnimatedSection>
                    <h3 className="md:text-4xl text-xl md:mb-12 mb-6">Drop us a line</h3>
                </ScrollAnimatedSection>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-10">
                        <input name="name" placeholder="Name*" className="w-full !bg-transparent px-4 pb-1 text-gray500 border-0 border-b border-divider rounded-none border-black focus:border-black focus:outline-none hover:border-black" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.name && formik.errors.name && <div className="text-error_main text-subtitle2 mt-1">{formik.errors.name}</div>}
                    </div>
                    <div className="mb-10">
                        <input name="email" type="email*" placeholder="Email" className="w-full !bg-transparent px-4 pb-1 text-gray500 border-0 border-b border-divider rounded-none border-black focus:border-black focus:outline-none hover:border-black" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.email && formik.errors.email && <div className="text-error_main text-subtitle2 mt-1">{formik.errors.email}</div>}
                    </div>
                    <div className="mb-10">
                        <Select options={services} multipleValu={true} value={selectValue} onChange={setSelectValue} placeholder="Select service" inputClass={"w-full !bg-transparent pb-1 px-4 text-gray500 border-0 border-b border-divider rounded-none border-black focus:border-black focus:outline-none hover:border-black "} />
                    </div>
                    <div className="mb-10">
                        <PhoneNumberInput name="number*" value={formik.values.number} onChange={(val) => formik.setFieldValue("number", val)} inputClass={"w-full py-0 px-2 !bg-transparent text-gray500 border-0 border-b border-divider rounded-none border-black focus:border-black focus:outline-none hover:border-black ring-transparent !hover:shadow-none"} />
                        {formik.touched.number && formik.errors.number ? <div className=" text-subtitle2 mt-1 text-error_main">{formik.errors.number}</div> : null}
                    </div>
                    <div className="mb-10">
                        <DatePicker disablePast onChange={(value) => formik.setFieldValue("dateTime", value)} value={formik.values.dateTime} placeholder={"Date and Time"} inputClass={`custom-input-contact w-full !bg-transparent pb-1 px-4 text-gray500 border-0 border-b border-divider rounded-none border-black focus:border-black focus:outline-none hover:border-black `} />
                    </div>
                    <div className="mb-10">
                        <textarea name="message" placeholder="How can we help you?" className="w-full px-4 h-16 bg-transparent rounded-none text-gray500 border-0 border-b border-divider border-black focus:border-black focus:outline-none hover:border-black hover:bg-transparent" value={formik.values.message} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>

                    <div className="flex justify-end">
                        <Button size="small" type="submit" disabled={formik.isSubmitting}>
                            Send
                        </Button>
                    </div>
                </form>
            </div>
            <Modal width={500} isOpen={isOpen} onClose={handleClose}>
                <div className="">
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
                        <Button size="small" onClick={handleClose}>
                            Ok !
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ContactForm;
