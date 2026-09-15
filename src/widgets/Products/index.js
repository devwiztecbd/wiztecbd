"use client";
import React, { useState, useEffect } from "react";

import OurFeatureProjects from "../OurFeatureProjects";
import { Section } from "@/components/Section";
import { fetchCaseStudies } from "@/utilities/api";
import { transformCaseStudiesToProducts } from "@/utilities/dataTransform";

const Products = ({ backgroundColors = [] }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchCaseStudies();
                if (data.status === 200 && data.caseStudies) {
                    const transformedProducts = transformCaseStudiesToProducts(data.caseStudies);
                    setProducts(transformedProducts);
                }
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <>
            {products.map((product, index) => {
                const backgroundColor = backgroundColors.length > 0 ? backgroundColors[index % backgroundColors.length] : product.color;

                return (
                    <Section key={index} id={`product-${index}`} bgColor={backgroundColor}>
                        <div className="container mx-auto px-4 text-white max-w-xl">
                            <OurFeatureProjects reverse={product.id % 2 == 0} ourFeatureProjectsData={product} />
                        </div>
                    </Section>
                );
            })}
        </>
    );
};

export default Products;
