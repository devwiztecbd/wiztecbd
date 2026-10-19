"use client";
import React, { useEffect, useState } from "react";

import RecruitmentNotice from "@/widgets/RecruitmentNotice";
import { vacanciData } from "@/app/staticData/career";
import MiniBanner from "@/components/MiniBanner";
import JobSummary from "@/widgets/JobSummary";
import { fetchCareers } from "@/utilities/api";

const Vacancies = ({ params }) => {
    const [jobPost, setJobPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetchCareers();
                if (response?.careers) {
                    const found = response.careers.find((j) => j.id == params.id);
                    if (found) {
                        setJobPost(found);
                    }
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobDetails();
    }, [params.id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!jobPost) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-H4 font-bold mb-4">Job not found!</p>
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-2 bg-success_main text-white rounded-lg hover:bg-success_dark transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <>
            <section>
                <MiniBanner title={jobPost.title} subtitle={"Explained our Vacancies"} BannerImage="/assets/images/miniBanner/Career.webp" />
            </section>
            <section id={"contentVac"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 md:flex md:space-x-16 space-y-16 md:space-y-0">
                    <div className=" md:w-2/3 w-full">
                        <RecruitmentNotice vacanciData={jobPost.details} />
                    </div>
                    <div className=" md:w-1/3 w-full ">
                        <JobSummary
                            location={jobPost.location}
                            vacancies={jobPost.vacancies}
                            applyLink={jobPost.applyLink}
                            jobType={jobPost.type}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Vacancies;
