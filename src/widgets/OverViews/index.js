"use client";
import React, { useEffect, useState } from "react";

import ScrollAnimatedSection from "@/components/ScrollAnimationSection";
import { overViewData as staticOverViewData } from "@/app/staticData/home";
import OverViewCard from "../OverViewCard";
import { fetchHome } from "@/utilities/api";

const OverViews = () => {
    const [overViewData, setOverViewData] = useState(staticOverViewData);

    useEffect(() => {
        const fetchOverViewData = async () => {
            try {
                const response = await fetchHome();
                if (response?.home) {
                    const data = response.home;

                    // Update overview data with API values
                    const updatedOverView = staticOverViewData.map(item => {
                        if (item.label.toLowerCase().includes("client")) {
                            return { ...item, target: parseInt(data.totalClients) || item.target };
                        }
                        if (item.label.toLowerCase().includes("website")) {
                            return { ...item, target: parseInt(data.totalWebsites) || item.target };
                        }
                        if (item.label.toLowerCase().includes("erp")) {
                            return { ...item, target: parseInt(data.totalERPs) || item.target };
                        }
                        if (item.label.toLowerCase().includes("mobile")) {
                            return { ...item, target: parseInt(data.totalMobileApps) || item.target };
                        }
                        return item;
                    });
                    setOverViewData(updatedOverView);
                }
            } catch (error) {
                console.error("Error fetching overview data:", error);
            }
        };
        fetchOverViewData();
    }, []);

    return (
        <>
            <ScrollAnimatedSection delay={0}>
                <div className=" mb-12">
                    <h2 className=" text-center text-H1 font-bold mb-2">Company Overview</h2>
                </div>
            </ScrollAnimatedSection>
            <div className="container mx-auto max-w-xl px-4 grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-6">
                {overViewData.map((data) => (
                    <ScrollAnimatedSection key={data.id} delay={data.id * 200}>
                        <OverViewCard year={data.year} target={data.target} initialCount={data.initialCount} label={data.label} duration={data.duration} />
                    </ScrollAnimatedSection>
                ))}
            </div>
        </>
    );
};

export default OverViews;
