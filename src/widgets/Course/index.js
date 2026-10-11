"use client";
import { useState } from "react";
import Link from "next/link";

import ImageURL from "@/components/ImageUrl";
import { isValidURL, Popup } from "../IntroDesign";

const formatCoursePrice = (price) => {
    if (price === null || price === undefined) return "Contact";
    const normalized = String(price).trim();
    if (normalized === "") return "Contact";
    if (normalized.toLowerCase() === "free") return "Free";
    return `BDT ${normalized}`;
};

const Course = ({ id, img, alt, title, classes, houre, seats, status, handlEnrole, time, classTime, link, linkText, price, duration }) => {
    const [showPopup, setShowPopup] = useState(false);
    const handleClick = (e) => {
        if (!isValidURL(link)) {
            e.preventDefault();
            e.stopPropagation();
            setShowPopup(true);
        }
    };

    return (
        <>
            {showPopup && (
                <Popup
                    message={link}
                    onClose={(e) => {
                        setShowPopup(false), e.stopPropagation();
                    }}
                />
            )}
            <div className=" max-w-350 w-full group">
                <div className=" flex-shrink-0 ">
                    <div className={`h-200 flex bg-black/10 relative justify-center items-center overflow-hidden`}>
                        <ImageURL height={200} width={350} alt={alt} image={img} className="w-full max-w-full max-h-full h-full object-cover" />
                        <span className="absolute top-0 right-0 px-4 py-[6px] text-subtitle2 bg-success_main capitalize text-white">{status}</span>
                    </div>
                </div>
                <div className="relative -top-30px min-w-72 bg-white p-4 flex-1 flex flex-col shadow-xxl border border-transparent mx-4 rounded-lg group-hover:-top-10px transition-all transform ease-in-out duration-700">
                    <div className="mb-auto">
                        <h6 className="  text-H6 text-primary font-semibold wh mb-6 whitespace-normal">{title}</h6>
                        <div className="mb-4 inline-flex items-center rounded-full bg-success_main px-3 py-1 text-white shadow-md">
                            <span className="mr-2 text-subtitle2 font-semibold uppercase tracking-wide">Course Fee</span>
                            <span className="text-subtitle1 font-bold">{formatCoursePrice(price)}</span>
                        </div>
                        <div className=" flex">
                            <div className=" w-1/2 text-black">
                                <div className="flex items-center flex-wrap gap-2 mb-1">
                                    {classes && (
                                        <p className=" flex items-center text-subtitle2 font-medium">
                                            <span className=" text-success_main mr-1">Classes :</span>
                                            {classes}
                                        </p>
                                    )}
                                    {classTime && (
                                        <p className=" flex items-center text-subtitle2 font-medium">
                                            <span className=" text-success_main mr-1">Class :</span>
                                            {classTime}
                                        </p>
                                    )}
                                    <p className=" flex items-center text-subtitle2 font-medium">
                                        <span className="  text-success_main mr-1">Hours :</span>
                                        {houre}
                                    </p>
                                </div>
                                <p className=" flex items-center text-subtitle2 font-medium">
                                    <span className="  text-success_main mr-1">Seats :</span>
                                    {seats}
                                </p>
                            </div>
                            <div className=" w-1/2 flex items-center justify-center">
                                {link ? (
                                    <Link href={isValidURL(link) ? link : "#"} onClick={handleClick} target="_blank" className=" hover-bg-left-to-right capitalize border border-success_dark cursor-pointer px-4 py-[6px] text-primary rounded-full text-subtitle2">
                                        <span>{linkText}</span>
                                    </Link>
                                ) : (
                                    <button onClick={(e) => handlEnrole(e, { id, title, houre, seats, status, classes, time, price, duration, classTime })} className=" hover-bg-left-to-right capitalize border border-success_dark cursor-pointer px-4 py-[6px] text-primary rounded-full text-subtitle2">
                                        <span>enroll now</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Course;
