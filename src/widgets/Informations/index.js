import React, { useEffect, useState } from "react";
import Information from "@/components/Information";
import api from "@/config/api";

const Informations = () => {
    const [offices, setOffices] = useState([]);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const response = await api.get("/api/get-offices");
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
        <div className=" grid md:grid-cols-3 sm:grid-cols-2 md:gap-6 gap-4">
            {offices.map((office) => (
                <Information
                    key={office.id}
                    country={office.title}
                    parentClassName="bg-custom-gradient"
                    address={office.address}
                    phone={office.phone}
                    email={office.email}
                />
            ))}
            <Information parentClassName="bg-custom-gradient" country="Careers." address={"Recruiting"} addReume="hrwiztecbd@gmail.com" />
        </div>
    );
};

export default Informations;
