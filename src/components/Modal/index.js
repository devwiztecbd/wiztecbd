"use client";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, title, children, width, closeBtn = true, modalClass }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 bg-black/50 flex justify-center md:items-center items-end !z-50 transition-opacity duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={onClose}>
            <div
                className={`bg-white ${modalClass}  md:rounded-lg rounded-t-lg shadow-lg  p-6 pt-12 md:pt-6 relative overflow-y-auto no-scrollbar transform transition-transform duration-500 ${isOpen ? "translate-y-0 scale-100" : "-translate-y-1/2 scale-75"}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: width ? `${width}px` : "90%", // পপআপের প্রস্থ সামঞ্জস্য করুন
                    height: "auto", // সর্বদা উচ্চতা স্বয়ংক্রিয় রাখুন
                    maxHeight: "90vh", // বড় কন্টেন্টের জন্য সর্বোচ্চ উচ্চতা যোগ করুন
                }}
            >
                {(title || closeBtn) && <div className="relative mb-2">
                    {title && <h5 className="text-H5 text-center font-bold whitespace-pre-wrap text-black">{title}</h5>}
                    {closeBtn && (
                        <div onClick={onClose} className="text-success_main border border-success_main rounded-sm hover:cursor-pointer absolute -top-10 right-[45%] md:top-0 md:right-0">
                            <IoMdClose size={24} />
                        </div>
                    )}
                </div>}
                <div className="">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
