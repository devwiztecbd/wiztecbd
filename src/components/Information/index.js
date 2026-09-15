import React from "react";
import Link from "next/link";

const Information = ({ country, address, phone, email, addReume, parentClassName }) => {
    return (
        <div className={`${parentClassName} md:px-6 md:py-12 px-4 py-6 shadow-xl transform transition duration-500 hover:-translate-y-10px`}>
            <h6 className=" text-H6 font-semibold md:mb-4 mb-3">{country} </h6>
            <p className="mb-2">{address}</p>
            {phone && (
                <p className="mb-2 font-medium">
                    Phone:
                    <Link href="tel:+447462312013" className=" font-normal pl-1 text-success_main">
                        {phone}
                    </Link>
                </p>
            )}

            {email && (
                <p className="font-medium ">
                    Email:
                    <Link href={`mailto:${email}`} className=" font-normal text-success_main pl-1">
                        {email}
                    </Link>
                </p>
            )}

            {addReume && (
                <p className="font-medium ">
                    Send resume:
                    <Link href={`mailto:${addReume}`} className=" font-normal text-success_main pl-1">
                        {addReume}
                    </Link>
                </p>
            )}
        </div>
    );
};

export default Information;
