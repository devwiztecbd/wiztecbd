'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";
import api from "@/config/api";
import { membershipCredentials } from "@/app/staticData/home";

const Footer = () => {
    const [offices, setOffices] = useState([]);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const response = await api.get("/api/get-offices");
                console.log(response)
                if (response.data.status === 200) {
                    setOffices(response.data.offices);
                }
            } catch (error) {
                console.error("Failed to fetch offices:", error);
            }
        };

        fetchOffices();
    }, []);

    return (
        <div>
            <div className="bg-footer-image  bg-cover bg-center h-130 bg-default_bg"></div>

            <div className=" bg-footer pt-100 -mt-4">
                <div className="container mx-auto px-4 max-w-xl grid grid-cols-4 text-white gap-16">
                    <div className=" col-span-4 md:col-span-1">
                        <Link href="/" className="flex items-center justify-center xs:justify-start w-full flex-shrink-0 h-9 mb-4">
                            <Image src={`/assets/images/Logos/logo.png`} alt="logo" height={38} width={167} className="w-auto max-w-full max-h-full h-auto object-cover" />
                        </Link>
                        <div className=" flex xs:justify-between flex-col xs:flex-row md:flex-col">
                            <div className=" flex justify-center flex-wrap xs:justify-start items-center gap-2 md:mb-6 ">
                                <Link target="_blank" href=" https://www.facebook.com/wiztecbd" className="px-3 py-2 hover:bg-success_main bg-success_main md:bg-transparent transition-all duration-400">
                                    <FaFacebook className=" text-white " size={24} />
                                </Link>
                                <Link target="_blank" href="http://www.youtube.com/@wizardsoftwaretechnologyba7240 " className="px-3 py-2 hover:bg-success_main bg-success_main md:bg-transparent transition-all duration-400">
                                    <FaYoutube className=" text-white " size={24} />
                                </Link>
                                <Link target="_blank" href="https://x.com/Wiztecsoft " className="px-3 py-2 hover:bg-success_main bg-success_main md:bg-transparent transition-all duration-400">
                                    <FaXTwitter className=" text-white " size={24} />
                                </Link>
                                <Link target="_blank" href="https://www.linkedin.com/company/wiztecbd " className="px-3 py-2 hover:bg-success_main bg-success_main md:bg-transparent transition-all duration-400">
                                    <FaLinkedinIn className=" text-white " size={24} />
                                </Link>
                            </div>
                            <div className=" flex flex-col xs:justify-start justify-center items-center xs:items-start mt-4 md:mt-0">
                                <h6 className=" font-medium text-H6 mb-4 ">Proud Member of</h6>
                                <div className="grid w-full max-w-[260px] grid-cols-3 items-center gap-4">
                                    {membershipCredentials.map((credential) => (
                                        <div key={credential.id} className="flex h-14 min-w-0 items-center justify-center" title={credential.name}>
                                            <Image
                                                src={credential.image}
                                                alt={`${credential.name} logo`}
                                                height={56}
                                                width={80}
                                                className="max-h-full w-auto max-w-full object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" col-span-4 xs:col-span-2 md:col-span-1">
                        <p className=" font-semibold mb-7">Terms</p>
                        <div className=" flex justify-between xs:inline">
                            <div>
                                <Link href="/services" className=" flex items-center gap-10px hover:text-success_main mb-2">
                                    <MdArrowRightAlt size={21} className=" text-success_main" />
                                    <p className=" ">Services</p>
                                </Link>
                                <Link href="/about" className=" flex items-center gap-10px hover:text-success_main mb-2">
                                    <MdArrowRightAlt size={21} className=" text-success_main" />
                                    <p className=" ">About Us</p>
                                </Link>
                                <Link href="/contact" className=" flex items-center gap-10px hover:text-success_main mb-2">
                                    <MdArrowRightAlt size={21} className=" text-success_main" />
                                    <p className=" ">Contact Us</p>
                                </Link>
                                <Link href="/portfolio" className=" flex items-center gap-10px hover:text-success_main mb-2">
                                    <MdArrowRightAlt size={21} className=" text-success_main" />
                                    <p className=" ">Portfolio</p>
                                </Link>
                                <Link href="/product" className=" flex items-center gap-10px hover:text-success_main mb-2">
                                    <MdArrowRightAlt size={21} className=" text-success_main" />
                                    <p className="/product">Product</p>
                                </Link>
                            </div>
                            <div>
                                <Link href="#" className=" flex items-center gap-10px hover:text-success_main mb-2">
                                    <MdArrowRightAlt size={21} className=" text-success_main" />
                                    <p className="/blog">Blog</p>
                                </Link>
                                <Link href="#" className=" flex items-center gap-10px hover:text-success_main mb-2">
                                    <MdArrowRightAlt size={21} className=" text-success_main" />
                                    <p className="/career">Career</p>
                                </Link>
                                <Link href="#" className=" flex items-center gap-10px hover:text-success_main mb-2">
                                    <MdArrowRightAlt size={21} className=" text-success_main" />
                                    <p className="/courses">Cources</p>
                                </Link>
                                <Link href="/team" className=" flex items-center gap-10px hover:text-success_main mb-2">
                                    <MdArrowRightAlt size={21} className=" text-success_main" />
                                    <p className=" ">Our Team</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className=" col-span-4 xs:col-span-2 md:col-span-2 space-y-8">
                        {offices.map((office) => (
                            <div key={office.id}>
                                <p className=" font-semibold mb-4">{office.title}</p>
                                <p className=" mb-0">
                                    {office.address} <br />
                                    Mobile :{" "}
                                    <Link href={`tel:${office.phone}`} target="_blank" className=" hover:text-success_main hover:underline">
                                        {office.phone}
                                    </Link>{" "}
                                    <br />
                                    Email :{" "}
                                    <Link href={`mailto:${office.email}`} target="_blank" className=" hover:text-success_main hover:underline">
                                        {office.email}
                                    </Link>
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-4 pb-4 text-subtitle2">
                        <p className="text-center">© {new Date().getFullYear()} Wizard Software & Technology Bangladesh Ltd. All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
