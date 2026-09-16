import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { IoIosArrowDown, IoMdClose, IoMdMenu } from "react-icons/io";

import Button from "@/components/Button";
import { aboutNavigation, otherNavigation, serviceNavigation, trainingNavigation } from "@/app/staticData/navigation";
import "react-modern-drawer/dist/index.css";

const Drawer = dynamic(() => import("react-modern-drawer"), { ssr: false });

const MobileDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openGroup, setOpenGroup] = useState(null);
    const [openCategory, setOpenCategory] = useState(null);

    const closeDrawer = () => setIsOpen(false);
    const toggleGroup = (group) => setOpenGroup((current) => (current === group ? null : group));
    const toggleCategory = (category) => setOpenCategory((current) => (current === category ? null : category));

    const directLinkClass = "flex items-center justify-between border-b border-black/5 px-5 py-4 font-medium text-secondary transition hover:bg-success_light hover:text-success_deep";

    const renderSimpleGroup = (groupId, title, items) => {
        const isExpanded = openGroup === groupId;

        return (
            <div>
                <button type="button" onClick={() => toggleGroup(groupId)} className={`flex w-full items-center justify-between border-b border-black/5 px-5 py-4 text-left font-semibold transition ${isExpanded ? "bg-success_light text-success_deep" : "text-secondary"}`}>
                    {title}
                    <IoIosArrowDown className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid overflow-hidden bg-[#F8F9FB] transition-[grid-template-rows] duration-300 ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="min-h-0">
                        {items.map((item) => (
                            <Link key={item.title} href={item.href} onClick={closeDrawer} className="flex items-center justify-between border-b border-black/5 py-3 pl-8 pr-5 text-sm font-medium text-gray500 hover:text-success_deep">
                                {item.title}
                                <BsArrowRight className="shrink-0 text-success_main" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)} type="button" aria-label="Open navigation menu">
                <IoMdMenu size={32} />
            </button>
            <Drawer open={isOpen} onClose={closeDrawer} direction="left" className="!w-full">
                <div className="h-screen overflow-y-auto bg-white pb-8 pt-7">
                    <div className="flex items-center justify-between border-b border-black/5 px-5 pb-5">
                        <Link onClick={closeDrawer} href="/" className="flex h-8 items-center">
                            <Image src="/assets/images/Logos/logo.png" alt="WiztecBD" height={48} width={150} className="h-auto max-h-full w-auto max-w-full object-contain" />
                        </Link>
                        <button type="button" onClick={closeDrawer} aria-label="Close navigation menu">
                            <IoMdClose size={32} />
                        </button>
                    </div>

                    <nav>
                        <Link onClick={closeDrawer} href="/" className={directLinkClass}>
                            Home <BsArrowRight />
                        </Link>

                        <div>
                            <button type="button" onClick={() => toggleGroup("services")} className={`flex w-full items-center justify-between border-b border-black/5 px-5 py-4 text-left font-semibold ${openGroup === "services" ? "bg-success_light text-success_deep" : "text-secondary"}`}>
                                Services
                                <IoIosArrowDown className={`transition-transform duration-300 ${openGroup === "services" ? "rotate-180" : ""}`} />
                            </button>
                            <div className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${openGroup === "services" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                <div className="min-h-0 bg-[#F8F9FB]">
                                    {serviceNavigation.map((category) =>
                                        category.sections.length > 0 ? (
                                            <div key={category.id}>
                                                <button type="button" onClick={() => toggleCategory(category.id)} className="flex w-full items-center justify-between border-b border-black/5 py-3 pl-7 pr-5 text-left text-sm font-semibold text-secondary">
                                                    {category.title}
                                                    <IoIosArrowDown className={`transition-transform ${openCategory === category.id ? "rotate-180" : ""}`} />
                                                </button>
                                                <div className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${openCategory === category.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                                    <div className="min-h-0 bg-white/80">
                                                        {category.sections.map((section) => (
                                                            <Link key={section.id} href={section.href} onClick={closeDrawer} className="block border-b border-black/5 py-3 pl-10 pr-5 transition hover:bg-success_light">
                                                                <span className="flex items-center justify-between text-xs font-semibold text-secondary">
                                                                    {section.title} <BsArrowRight className="shrink-0 text-success_main" />
                                                                </span>
                                                                {section.items.length > 0 && (
                                                                    <span className="mt-2 block space-y-1.5">
                                                                        {section.items.map((item) => (
                                                                            <span key={item.title} className="flex items-start gap-2 text-[10px] leading-4 text-gray500">
                                                                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-success_main" />
                                                                                {item.title}
                                                                            </span>
                                                                        ))}
                                                                    </span>
                                                                )}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <Link key={category.id} href={category.href} onClick={closeDrawer} className="flex items-center justify-between border-b border-black/5 py-3 pl-7 pr-5 text-sm font-semibold text-secondary hover:text-success_deep">
                                                {category.title} <BsArrowRight className="text-success_main" />
                                            </Link>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>

                        <Link onClick={closeDrawer} href="/product" className={directLinkClass}>
                            Product <BsArrowRight />
                        </Link>
                        <Link onClick={closeDrawer} href="/portfolio" className={directLinkClass}>
                            Portfolio <BsArrowRight />
                        </Link>
                        {renderSimpleGroup("training", "Training", trainingNavigation)}
                        {renderSimpleGroup("about", "About", aboutNavigation)}
                        {renderSimpleGroup("others", "Others", otherNavigation)}

                        <div className="px-5 pt-7">
                            <Link href="/contact" onClick={closeDrawer}>
                                <Button fullWidth size="small">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            </Drawer>
        </>
    );
};

export default MobileDrawer;
