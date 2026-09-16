"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";

import { aboutNavigation, otherNavigation, serviceNavigation, trainingNavigation } from "@/app/staticData/navigation";
import LetsTalk from "../LetsTalk";
import MobileDrawer from "../MobileDrawer";
import Button from "@/components/Button";
import ServiceMegaMenu from "@/components/MegaMenu";
import LinkMegaMenu from "@/components/LinkMegaMenu";
import useModal from "@/hooks/useModal";

const Header = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();
    const openMenu = (menu) => setActiveMenu(menu);
    const closeMenu = () => setActiveMenu(null);

    return (
        <>
            <nav className={` backdrop-blur-md text-secondary sticky top-0 z-30 shadow-lg ${activeMenu ? " bg-white" : "bg-white/60"}`}>
                <div className="container mx-auto max-w-xl  flex justify-between py-4 md:py-0 px-4 items-center ">
                    <div className="text-2xl font-bold">
                        <Link href="/" className="flex items-center w-full  justify-center flex-shrink-0 md:h-12 h-8">
                            <Image src={`/assets/images/Logos/logo.png`} alt="logo" height={38} width={167} className="w-auto max-w-full max-h-full h-auto object-cover" />
                        </Link>
                    </div>
                    <div className="md:flex hidden space-x-6 items-center justify-center">
                        <Link href="/services" className="group hover:text-success_main inline-flex flex-col justify-center h-100" onMouseEnter={() => openMenu("services")} onMouseLeave={closeMenu} onFocus={() => openMenu("services")}>
                            <span className="flex items-center gap-0.5">
                                Services
                                <RiArrowRightSLine size={18} />
                            </span>
                            <span className={`  h-2px bg-success_main transition-width duration-300 ease-in-out w-0 group-hover:w-full`}></span>
                        </Link>
                        <Link href="/product" className=" hidden lg:inline-flex text-secondary group h-100 flex-col justify-center hover:text-success_main" onMouseEnter={closeMenu}>
                            Product
                            <span className={`h-2px bg-success_main transition-width duration-300 ease-in-out w-0 group-hover:w-full`}></span>
                        </Link>
                        <Link href="/portfolio" className=" text-secondary group h-100 flex flex-col justify-center hover:text-success_main" onMouseEnter={closeMenu}>
                            Portfolio
                            <span className={`  h-2px bg-success_main transition-width duration-300 ease-in-out w-0 group-hover:w-full`}></span>
                        </Link>
                        <Link href="/courses" className="text-secondary group h-100 inline-flex flex-col justify-center hover:text-success_main" onMouseEnter={() => openMenu("training")} onMouseLeave={closeMenu} onFocus={() => openMenu("training")}>
                            <span className="flex items-center gap-0.5">
                                Training
                                <RiArrowRightSLine size={18} />
                            </span>
                            <span className="h-2px w-0 bg-success_main transition-width duration-300 ease-in-out group-hover:w-full"></span>
                        </Link>
                        <Link onMouseEnter={() => openMenu("about")} onMouseLeave={closeMenu} onFocus={() => openMenu("about")} href="/about" className=" text-secondary group h-100 inline-flex flex-col justify-center hover:text-success_main">
                            <span className="flex items-center gap-0.5">
                                About
                                <RiArrowRightSLine size={18} />
                            </span>
                            <span className={`h-2px bg-success_main transition-width duration-300 ease-in-out w-0 group-hover:w-full`}></span>
                        </Link>
                        <button type="button" onMouseEnter={() => openMenu("others")} onMouseLeave={closeMenu} onFocus={() => openMenu("others")} className=" text-secondary group h-100 flex flex-col justify-center hover:text-success_main">
                            <span className="flex items-center gap-0.5">
                                Others
                                <RiArrowRightSLine size={18} />
                            </span>
                            <span className={`h-2px bg-success_main transition-width duration-300 ease-in-out w-0 group-hover:w-full`}></span>
                        </button>
                        <Link href="/contact" className=" text-secondary group h-100 flex flex-col justify-center hover:text-success_main" onMouseEnter={closeMenu}>
                            Contact Us
                            <span className={`h-2px bg-success_main transition-width duration-300 ease-in-out w-0 group-hover:w-full`}></span>
                        </Link>
                    </div>
                    {activeMenu === "services" && <ServiceMegaMenu menuData={serviceNavigation} onMouseEnter={() => openMenu("services")} onMouseLeave={closeMenu} onClose={closeMenu} />}
                    {activeMenu === "training" && <LinkMegaMenu eyebrow="Learn with us" title="Training" items={trainingNavigation} onMouseEnter={() => openMenu("training")} onMouseLeave={closeMenu} onClose={closeMenu} />}
                    {activeMenu === "about" && <LinkMegaMenu title="About" items={aboutNavigation} featuredImage="/assets/images/Logos/familly.jpg" featuredImageAlt="The WiztecBD team" onMouseEnter={() => openMenu("about")} onMouseLeave={closeMenu} onClose={closeMenu} />}
                    {activeMenu === "others" && <LinkMegaMenu eyebrow="Explore more" title="Others" items={otherNavigation} onMouseEnter={() => openMenu("others")} onMouseLeave={closeMenu} onClose={closeMenu} />}
                    <Button onClick={() => openModal()} type="button" size="small">
                        {"Let's Talk"}
                    </Button>
                    <div className=" md:hidden">
                        <MobileDrawer />
                    </div>
                </div>
            </nav>
            <LetsTalk isOpen={isOpen} onClose={() => closeModal()} />
        </>
    );
};

export default Header;
