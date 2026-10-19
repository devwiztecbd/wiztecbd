"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TbCurrentLocation } from "react-icons/tb";

import VacanciesTable from "@/components/VacanciesTable";
import ScrollAnimatedSection from "@/components/ScrollAnimationSection";
import { options } from "@/app/staticData/career";
import Select from "@/components/Select";
import { fetchCareers as getCareersApi } from "@/utilities/api";

const CurrentOpenings = () => {
    const [fieldValue, setFieldValue] = useState("");
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await getCareersApi();
                if (response?.careers) {
                    setCareers(response.careers);
                }
            } catch (error) {
                console.error("Error fetching careers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCareers();
    }, []);

    if (loading) {
        return <div className="py-20 text-center font-semibold text-H5">Loading careers...</div>;
    }

    return (
        <div>
            <ScrollAnimatedSection>
                <h1 className="text-H1 font-bold md:mb-16 mb-6 text-center">Current Openings</h1>
            </ScrollAnimatedSection>
            <div>
                <div className="flex items-center justify-center md:justify-start gap-2 md:mb-6 mb-4">
                    <span>
                        <TbCurrentLocation size={24} className="text-success_main" />
                    </span>
                    <h5 className="text-H5 font-semibold">{careers.length} open job vacancies</h5>
                </div>
                <form className="flex flex-col md:flex-row items-center justify-between pb-4 border-b border-divider">
                    <h5 className="text-H5 font-semibold mb-4 md:mb-0 ">Current Openings</h5>

                    {/* <Select options={options} value={fieldValue} multipleValu={false} onChange={setFieldValue} inputClass={"focus:ring-1 w-64 focus:ring-success_main hover:ring-success_main hover:shadow-input focus:shadow-input px-4 h-9 flex items-center bg-transparent rounded-lg focus:outline-none ring-1 ring-success_main focus:border-success_main"} /> */}
                </form>
                <div className=" py-9 flex flex-col md:gap-6 gap-4 w-full">
                    {careers.length > 0 ? (
                        careers.map((data, index) => {
                            return (
                                <ScrollAnimatedSection key={data.id} delay={`${Number(index + 1) * 100}`}>
                                    <Link href={`career/${data.id}`}>
                                        <VacanciesTable name={data.title} deadline={new Date(data.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} vacancies={data.vacancies} />
                                    </Link>
                                </ScrollAnimatedSection>
                            );
                        })
                    ) : (
                        <p className="text-center py-10 text-subtitle1">No job openings available at the moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CurrentOpenings;
