"use client";
import { useState, useEffect } from "react";
import { fetchCareers } from "@/utilities/api";

const useCareers = () => {
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        fetchCareers()
            .then((data) => {
                if (isMounted) {
                    setCareers(data?.careers || []);
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
    }, []);

    return { careers, loading, error };
};

export default useCareers;
