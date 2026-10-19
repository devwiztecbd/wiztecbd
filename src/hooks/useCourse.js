"use client";
import { useState, useEffect } from "react";
import {
    fetchCourseById,
    fetchCourses,
    fetchCurriculums,
    fetchCourseSoftwares,
    fetchCourseForWhoms,
    fetchCourseBenefits,
    fetchCourseProjects,
    fetchCourseJobPositions,
} from "@/utilities/api";
import { transformCourseData } from "@/utilities/dataTransform";
import { previewCourse } from "@/app/staticData/coursePreview";
import { normalizeCourseSlug, getCourseSlug } from "@/utils/courseSlug";

const useCourse = (idOrSlug) => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        if (!idOrSlug) {
            setCourse(null);
            setError(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const loadCourse = async () => {
            try {
                let resolvedId = idOrSlug;
                const normalizedInputSlug = normalizeCourseSlug(idOrSlug);

                // If idOrSlug is not purely numeric, resolve slug to ID
                if (!/^\d+$/.test(String(idOrSlug).trim())) {
                    const coursesRes = await fetchCourses();
                    const allCourses = coursesRes?.courses || [];

                    const foundCourse = allCourses.find((c) => {
                        const slug = getCourseSlug(c);
                        return slug === normalizedInputSlug;
                    });

                    if (foundCourse?.id) {
                        resolvedId = foundCourse.id;
                    } else if (normalizedInputSlug === getCourseSlug(previewCourse)) {
                        if (isMounted) {
                            setCourse(previewCourse);
                            setLoading(false);
                        }
                        return;
                    }
                }

                const res = await fetchCourseById(resolvedId);
                const rawCourse = res?.course || res?.courses?.[0] || null;

                if (rawCourse) {
                    const formatted = transformCourseData(rawCourse, previewCourse);

                    // Fetch related data if ID arrays are present
                    try {
                        const promises = [];
                        if (Array.isArray(rawCourse.curriculums) && rawCourse.curriculums.length > 0) {
                            promises.push(
                                fetchCurriculums()
                                    .then((r) => ({
                                        type: "curriculums",
                                        data: (r?.curriculums || []).filter((item) => rawCourse.curriculums.includes(item.id)),
                                    }))
                                    .catch(() => null)
                            );
                        }
                        if (Array.isArray(rawCourse.softwares) && rawCourse.softwares.length > 0) {
                            promises.push(
                                fetchCourseSoftwares()
                                    .then((r) => ({
                                        type: "softwares",
                                        data: (r?.courseSoftwares || []).filter((item) => rawCourse.softwares.includes(item.id)),
                                    }))
                                    .catch(() => null)
                            );
                        }
                        if (Array.isArray(rawCourse.forWhoms) && rawCourse.forWhoms.length > 0) {
                            promises.push(
                                fetchCourseForWhoms()
                                    .then((r) => ({
                                        type: "forWhoms",
                                        data: (r?.courseForWhoms || []).filter((item) => rawCourse.forWhoms.includes(item.id)),
                                    }))
                                    .catch(() => null)
                            );
                        }
                        if (Array.isArray(rawCourse.benefits) && rawCourse.benefits.length > 0) {
                            promises.push(
                                fetchCourseBenefits()
                                    .then((r) => ({
                                        type: "benefits",
                                        data: (r?.courseBenefits || []).filter((item) => rawCourse.benefits.includes(item.id)),
                                    }))
                                    .catch(() => null)
                            );
                        }
                        if (Array.isArray(rawCourse.projects) && rawCourse.projects.length > 0) {
                            promises.push(
                                fetchCourseProjects()
                                    .then((r) => ({
                                        type: "projects",
                                        data: (r?.courseProjects || []).filter((item) => rawCourse.projects.includes(item.id)),
                                    }))
                                    .catch(() => null)
                            );
                        }
                        if (Array.isArray(rawCourse.positions) && rawCourse.positions.length > 0) {
                            promises.push(
                                fetchCourseJobPositions()
                                    .then((r) => ({
                                        type: "positions",
                                        data: (r?.courseJobPositions || []).filter((item) => rawCourse.positions.includes(item.id)),
                                    }))
                                    .catch(() => null)
                            );
                        }

                        if (promises.length > 0) {
                            const relationResults = await Promise.all(promises);
                            relationResults.forEach((result) => {
                                if (!result || !result.data || result.data.length === 0) return;
                                if (result.type === "curriculums") formatted.curriculumsData = result.data;
                                if (result.type === "softwares") formatted.softwaresData = result.data;
                                if (result.type === "forWhoms") formatted.forWhomsData = result.data;
                                if (result.type === "benefits") formatted.benefitsData = result.data;
                                if (result.type === "projects") formatted.projectsData = result.data;
                                if (result.type === "positions") formatted.positionsData = result.data;
                            });
                        }
                    } catch (relationErr) {
                        console.warn("Could not load relation details:", relationErr);
                    }

                    if (isMounted) setCourse(formatted);
                } else {
                    if (isMounted) setCourse(previewCourse);
                }
            } catch (err) {
                console.error("Failed to load course details:", err);
                if (isMounted) {
                    setError(err);
                    // Fallback to preview course so the UI never completely breaks
                    setCourse(previewCourse);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadCourse();

        return () => {
            isMounted = false;
        };
    }, [idOrSlug]);

    return { course, loading, error };
};

export default useCourse;
