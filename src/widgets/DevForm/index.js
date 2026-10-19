"use client";
import { useFormik } from "formik";

import { formValidationSchema } from "@/app/staticData/schema";
import { useContextApi } from "@/app/utilities/contextApi";
import PhoneNumberInput from "@/components/PhoneNumber";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import useModal from "@/hooks/useModal";
import { hireEmployee } from "@/utilities/api";

const DevForm = () => {
    const { isOpen: isSuccess, openModal: openSuccess, closeModal: closeSuccess } = useModal();
    const { isOpen, openModal, closeModal } = useModal();
    const { isOpen: isWarning, openModal: openWarning, closeModal: closeWarning } = useModal();
    const { isOpen: isExpertist, openModal: openExpertist, closeModal: closeExpertist } = useModal();
    const { isLocation, setIsLocation, selectedData: isExpert, setSelectedData, setSelected, setSelectRole, selectRole } = useContextApi();

    // sumit modal
    const handleClose = () => {
        closeModal();
        closeSuccess();
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            number: "",
            email: "",
            company: "",
        },
        validationSchema: formValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (!isLocation) {
                openWarning(true);
                return;
            }
            if (selectRole.length == 0) {
                openExpertist(true);
                return;
            }

            // Prepare required_employees array
            console.log('isExpert data:', isExpert);
            const requiredEmployees = isExpert.map((expert) => ({
                role: expert.technology,
                languages: [expert.language], // Convert to array as per API requirement
                expertise: expert.expert,
                timeline_days: parseInt(expert.day) || 30,
                timeline_hours: parseInt(expert.dayFormate) || 8
            }));
            console.log('requiredEmployees:', requiredEmployees);

            // Prepare final payload
            const payload = {
                job_environment: isLocation,
                name: values.name,
                email: values.email,
                phone_number: values.number,
                company: values.company,
                required_employees: requiredEmployees
            };

            console.log('Submitting payload:', payload);

            try {
                openModal();
                const response = await hireEmployee(payload);
                console.log('API Response:', response);
                
                const resStatus = response?.status || response?.data?.status;
                if (resStatus === 200 || resStatus === 201) {
                    setTimeout(() => {
                        openSuccess();
                    }, 200);
                    
                    // Reset form after successful submission
                    setIsLocation("");
                    setSelectedData([]);
                    setSelected({
                        remote: "",
                        onsite: "",
                        hybrid: "",
                    });
                    setSelectRole([]);
                    resetForm();
                } else {
                    // Handle API error
                    closeModal();
                    alert('Submission failed. Please try again.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                console.error('Error response:', error.response);
                console.error('Error data:', error.response?.data);
                console.error('Error status:', error.response?.status);
                closeModal();
                
                // Show more specific error message
                if (error.response?.data?.message) {
                    alert(`Submission failed: ${error.response.data.message}`);
                } else if (error.response?.status === 400) {
                    alert('Submission failed: Invalid data provided');
                } else if (error.response?.status === 500) {
                    alert('Submission failed: Server error. Please try again later.');
                } else {
                    alert('Submission failed. Please try again.');
                }
            }
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit} className="mt-6 md:mt-12">
                <div className="grid grid-cols-2 gap-x-2 gap-y-6 mb-10">
                    <div className="col-span-1 flex flex-col">
                        <label htmlFor="name" className="font-semibold mb-2">
                            Name*
                        </label>
                        <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Your Full name" className="focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input px-4 py-2.5 bg-secondary_bg rounded-lg focus:outline-none ring-1 ring-success_main focus:border-transparent " />
                        {formik.touched.name && formik.errors.name && <div className="text-subtitle2 mt-1 text-error_main">{formik.errors.name}</div>}
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <label htmlFor="email" className="font-semibold mb-2">
                            Email*
                        </label>
                        <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Your Email Address" className="focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input px-4 py-2.5 bg-secondary_bg rounded-lg focus:outline-none ring-1 ring-success_main focus:border-transparent " />
                        {formik.touched.email && formik.errors.email && <div className="text-subtitle2 mt-1 text-error_main">{formik.errors.email}</div>}
                    </div>

                    <div className="col-span-1 flex flex-col">
                        <PhoneNumberInput label={" Mobile phone*"} value={formik.values.number} name="number" onChange={(val) => formik.setFieldValue("number", val)} inputClass={`focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input px-4 py-[4px] bg-secondary_bg rounded-lg focus:outline-none ring-1 ring-success_main focus:border-transparent`} />
                        {formik.touched.number && formik.errors.number ? <div className=" text-subtitle2 mt-1 text-error_main">{formik.errors.number}</div> : null}
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <label htmlFor="company" className="font-semibold mb-2">
                            Company
                        </label>
                        <input type="text" name="company" onChange={formik.handleChange} value={formik.values.company} placeholder="Company Name" className="focus:ring-1 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input px-4 py-2.5 bg-secondary_bg rounded-lg focus:outline-none ring-1 ring-success_main focus:border-transparent " />
                    </div>
                </div>
                <Button type="submit">Submit</Button>
            </form>
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
            <Modal width={200} isOpen={isWarning} onClose={closeWarning} closeBtn={false} modalClass={"!px-4 !pt-2 !pb-4"}>
                <p className=" text-body2 font-medium text-warning_main text-center">Choose Job Environment Type</p>
            </Modal>
            <Modal width={200} isOpen={isExpertist} onClose={closeExpertist} closeBtn={false} modalClass={"!px-4 !pt-2 !pb-4"}>
                <p className=" text-body2 font-medium text-warning_main text-center">Choose Expertises </p>
            </Modal>
        </>
    );
};

export default DevForm;
