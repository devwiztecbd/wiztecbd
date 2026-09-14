"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import useModal from "@/hooks/useModal";
import LetsTalk from "../LetsTalk";

import api from "@/config/api";

const OfferPopup = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const {
        isOpen: isLetsTalkOpen,
        openModal: openLetsTalk,
        closeModal: closeLetsTalk,
    } = useModal();
    const [image, setImage] = useState("/assets/images/jueal.png");

    const handleBookAppointment = () => {
        closeModal();
        openLetsTalk();
    };

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await api.get("/api/get-home");
                if (response.data && response.data.home && response.data.home.image) {
                    setImage(response.data.home.image);
                }
            } catch (error) {
                console.error("Error fetching popup image:", error);
            }
        };
        fetchImage();
    }, []);

    useEffect(() => {
        const hasShownInSession = sessionStorage.getItem("offerPopupShown");

        if (!hasShownInSession) {
            const showPopupTimeout = setTimeout(() => {
                openModal(true);
                sessionStorage.setItem("offerPopupShown", "true");

                const closePopupTimeout = setTimeout(() => {
                    closeModal(false);
                }, 60 * 1000);
                return () => clearTimeout(closePopupTimeout);
            }, 0.1 * 60 * 1000);

            return () => clearTimeout(showPopupTimeout);
        }
    }, []);

    return (
        <>
            <Modal width={800} isOpen={isOpen} onClose={closeModal}>
                <div className="flex flex-col md:flex-row pt-5 gap-4 md:gap-0">
                    <div className="flex items-center justify-center md:w-2/5 w-full">
                        <div className="bg-auto-pop md:h-370 p-4 pb-0 md:left-0 right-0 bottom-0 2xl:bottom-1 flex items-end justify-center w-full">
                            <Image src={image} alt={"offer"} height={370} width={256} className="h-auto w-256 max-h-full max-w-full object-cover" />
                        </div>
                    </div>
                    <div className="md:w-3/5 w-full pl-10">
                        <h5 className="text-H5 font-semibold whitespace-pre-wrap text-center leading-normal mb-5">
                            Thinking <span className="text-success_main">Hassle Free</span> <br /> Software Development Service?
                        </h5>
                        <p className="mb-4 text-center">We provide custom software development services for business ERP solutions, blockchain, hospitality, e-commerce, e-learning & others.</p>
                        <Button className={"w-full mb-4"} size="small" type="button" onClick={handleBookAppointment}>
                            book appointment
                        </Button>
                        <p className="text-subtitle2 text-center mb-4">
                            For <span className="text-success_main">30 Minutes</span> Free Consultancy
                        </p>
                        <Link href="/" className="flex items-center w-full justify-center flex-shrink-0 md:h-12 h-8">
                            <Image src={`/assets/images/Logos/logo.png`} alt="logo" height={38} width={167} className="w-auto max-w-full max-h-full h-auto object-cover" />
                        </Link>
                    </div>
                </div>
            </Modal>
            <LetsTalk isOpen={isLetsTalkOpen} onClose={closeLetsTalk} />
        </>
    );
};

export default OfferPopup;
