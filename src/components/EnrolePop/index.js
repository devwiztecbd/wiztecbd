"use client";

import { FiX } from "react-icons/fi";
import { previewCourse } from "@/app/staticData/coursePreview";
import ApplicationSidebar from "@/widgets/CourseDetailsLayout/ApplicationSidebar";
import Modal from "../Modal";

export default function EnrollPop({ modalData, isOpen, onClose }) {
    const course = { ...previewCourse, title: modalData?.title || previewCourse.title };

    return (
        <Modal width={420} isOpen={isOpen} onClose={onClose} closeBtn={false} modalClass="!max-w-full !rounded-2xl !p-0">
            <button type="button" onClick={onClose} aria-label="Close application" className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray700 hover:bg-success_light focus-visible:outline focus-visible:outline-2 focus-visible:outline-success_deep">
                <FiX aria-hidden="true" size={18} />
            </button>
            {isOpen && <ApplicationSidebar key={modalData?.id} course={course} embedded />}
        </Modal>
    );
}
