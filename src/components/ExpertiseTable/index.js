import React, { useState, useEffect } from "react";

import Select from "../Select";
import { useContextApi } from "@/app/utilities/contextApi";
import { fetchExpertises } from "@/utilities/api";

const ExpertiseTable = ({ fieldValue, expartist, timeLine, header }) => {
    const { selectedData, setSelectedData } = useContextApi();
    const [expertises, setExpertises] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch expertises from API
    useEffect(() => {
        const loadExpertises = async () => {
            try {
                const data = await fetchExpertises();
                if (data && data.status === 200 && Array.isArray(data.expertises)) {
                    const formattedExpertises = data.expertises.map(expertise => {
                        // Handle different possible response structures
                        let label, value;
                        if (typeof expertise === 'string') {
                            label = expertise;
                            value = expertise.toLowerCase().replace(/\s+/g, '-');
                        } else if (expertise.name) {
                            label = expertise.name;
                            value = expertise.value || expertise.name.toLowerCase().replace(/\s+/g, '-');
                        } else {
                            // Fallback for unexpected structure
                            label = JSON.stringify(expertise);
                            value = 'unknown';
                        }
                        return { label, value };
                    });
                    setExpertises(formattedExpertises);
                }
            } catch (error) {
                console.error('Error fetching expertises:', error);
                // Fallback to static languages if API fails
                setExpertises([
                    { label: "Python", value: "python" },
                    { label: "Node Js", value: "node" },
                    { label: "PHP", value: "php" },
                ]);
            } finally {
                setLoading(false);
            }
        };

        loadExpertises();
    }, []);

    const handleSelectChange = (index, field, value) => {
        setSelectedData((prevSelectedData) => {
            const updatedData = [...prevSelectedData];
            updatedData[index] = {
                ...updatedData[index], // Keep existing values
                [field]: value,
                technology: fieldValue[index],
            };
            return updatedData;
        });
    };

    return (
        <div className="w-full">
            <div className="min-w-[762px] ">
                <div className="p-2 md:p-4 md:mb-4 mb-2 w-full bg-primary border border-transparent flex items-center gap-4">
                    {header.map((head, index) => (
                        <p key={index} className={`w-1/4 text-subtitle1 text-white font-semibold ${index === header.length - 1 ? "text-end" : "text-center md:text-start"}`}>
                            {head}
                        </p>
                    ))}
                </div>

                {fieldValue.length == 0 && (
                    <div className="hover:border-success_main hover:shadow-input border border-transparent px-3 py-2 justify-center bg-white flex items-center ">
                        <h6 className=" text-H6 font-semibold text-center text-gray500 capitalize">no roll data available</h6>
                    </div>
                )}

                {fieldValue.length > 0 && (
                    <form className="md:space-y-4 space-y-2 ">
                        {fieldValue.map((val, index) => (
                            <div key={index} className="hover:border-success_main  hover:shadow-input border border-transparent px-3 py-2  bg-white flex md:items-center gap-4 ">
                                <p className="md:w-1/4 capitalize text-center md:text-start">{val}</p>

                                <div className="md:w-1/4">
                                    <Select
                                        inputClass="focus:ring-1 w-full focus:ring-success_main text-sm hover:ring-transparent focus:shadow-input px-4 py-1 rounded-lg flex items-center bg-secondary_bg focus:outline-none ring-1 ring-success_main focus:border-success_main"
                                        options={loading ? [] : expertises}
                                        multipleValu={false}
                                        value={selectedData[index]?.language || ""}
                                        onChange={(value) => handleSelectChange(index, "language", value)}
                                        placeholder={loading ? "Loading..." : "Select language"}
                                    />
                                </div>

                                <div className="md:w-1/4">
                                    <Select
                                        inputClass="focus:ring-1 w-full focus:ring-success_main text-sm hover:ring-transparent focus:shadow-input px-4 py-1 rounded-lg flex items-center bg-secondary_bg focus:outline-none ring-1 ring-success_main focus:border-success_main"
                                        options={expartist}
                                        multipleValu={false}
                                        value={selectedData[index]?.expert || ""}
                                        onChange={(value) => handleSelectChange(index, "expert", value)}
                                        placeholder="Select Expertist"
                                    />
                                </div>
                                <div className="md:w-1/4 flex md:items-center gap-2 md:justify-end justify-between">
                                    <input type="number" name="number" value={selectedData[index]?.day || ""} onChange={(e) => handleSelectChange(index, "day", e.target.value)} placeholder="Days" className="focus:ring-1 px-1 text-center  py-1 rounded-lg w-12 appearance-none input-no-arrows focus:ring-transparent hover:ring-transparent bg-secondary_bg ring-1 ring-success_main focus:border-transparent" />
                                    <Select
                                        inputClass="focus:ring-1 md:w-32 w-64 focus:ring-success_main text-sm hover:ring-transparent focus:shadow-input px-4 py-1 rounded-lg flex items-center bg-secondary_bg focus:outline-none ring-1 ring-success_main focus:border-success_main"
                                        options={timeLine}
                                        multipleValu={false}
                                        value={selectedData[index]?.dayFormate || ""}
                                        onChange={(value) => handleSelectChange(index, "dayFormate", value)}
                                        placeholder="Hours/day"
                                    />
                                </div>
                            </div>
                        ))}
                    </form>
                )}
            </div>
        </div>
    );
};

export default ExpertiseTable;
