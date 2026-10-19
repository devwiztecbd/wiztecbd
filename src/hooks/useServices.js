"use client";
import { useState, useEffect } from "react";
import { fetchServices } from "@/utilities/api";

const useServices = (index) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!index) return;

        let isMounted = true;
        setLoading(true);
        fetchServices(index)
            .then((data) => {
                if (isMounted) {
                    setServices(data?.services || []);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [index]);

    return { services, loading, error };
};

export default useServices;
