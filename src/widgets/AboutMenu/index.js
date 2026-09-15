import Button from "@/components/Button";
import GradientText from "@/components/GradientText";
import ImageURL from "@/components/ImageUrl";
import Menu from "@/components/Menu";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const AmoutMenu = ({ onMouseEnter, onMouseLeave, onClose }) => {
    return (
        <Menu onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className=" bg-mega-gradient ">
                <div className=" container mx-auto px-4 max-w-xl">
                    {/* Main Services Section */}
                    <div className=" grid grid-cols-3">
                        <div className=" py-8">
                            <div className="mb-6">
                                <GradientText className={"text-subtitle1 font-semibold "} text={"Our familly member"} />
                            </div>
                            <div className=" h-200 flex items-center pr-4">
                                <ImageURL image={"/assets/images/Logos/familly.jpg"} alt={"familly"} height={223} width={1920} />
                            </div>
                        </div>
                        <div className=" bg-white py-8 pl-4 flex flex-col justify-between">
                            <div>
                                <p className="text-subtitle1 font-semibold text-center capitalize mb-6">About Us</p>
                                <p className=" text-center">Get to know who we are, what we do, and how we help businesses grow with technology. Discover our journey and explore what we can build for you.</p>
                            </div>
                            <div className=" flex items-center justify-center">
                                <Link onClick={onClose} href="/about">
                                    <Button size="small">
                                        about
                                        <BsArrowRight />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className=" bg-white py-8 pl-4 flex flex-col justify-between">
                            <div>
                                <p className="text-subtitle1 font-semibold text-center capitalize mb-6">Our team</p>
                                <p className=" text-center">Meet the talented people behind our innovative software and digital solutions. Get to know our experts and the passion driving every project we deliver.</p>
                            </div>
                            <div className=" flex items-center justify-center">
                                <Link onClick={onClose} href={"/team"}>
                                    <Button size="small">
                                        our team
                                        <BsArrowRight />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Menu>
    );
};

export default AmoutMenu;
