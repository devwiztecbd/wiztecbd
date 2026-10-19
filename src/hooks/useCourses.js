"use client";
import { useState, useEffect } from "react";
import { fetchCourses } from "@/utilities/api";
import { transformCourseData } from "@/utilities/dataTransform";
import { previewCourse } from "@/app/staticData/coursePreview";

const useCourses = (params = {}) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        fetchCourses(params)
            .then((data) => {
                if (isMounted) {
                    const rawList = data?.courses || [];
                    const normalized = rawList.map((course) => transformCourseData(course, previewCourse));
                    setCourses(normalized);
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
    }, [JSON.stringify(params)]);

    return { courses, loading, error };
};

export default useCourses;
