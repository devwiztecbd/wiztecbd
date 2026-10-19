import { FiUsers } from "react-icons/fi";
import ImageCardGrid from "./ImageCardGrid";

const imageDirectory = "/assets/icons/CoursePage/Data Analytics Course/This Course is Designed For";

// Demo audiences using existing local course images.
const audiences = [
    { id: "aspiring-analysts", name: "Aspiring Data Analysts & Business Analysts", image: "Aspiring Data Analysts & Business Analysts.webp" },
    { id: "students", name: "Students & Job Seekers", image: "Students & Job Seekers.webp" },
    { id: "developers", name: "Software Engineers & Developers", image: "Software Engineers & Developers.webp" },
    { id: "business-owners", name: "Entrepreneurs & Business Owners", image: "Entrepreneurs & Business Owners.webp" },
    { id: "consultants", name: "Freelancers & Consultants", image: "Freelancers & Consultants.webp" },
].map((audience) => ({ ...audience, image: `${imageDirectory}/${audience.image}` }));

import { normalizeImageUrl } from "@/utilities/dataTransform";

export default function AudienceGrid({ audiences: dynamicAudiences = null }) {
    const activeAudiences = Array.isArray(dynamicAudiences) && dynamicAudiences.length > 0
        ? dynamicAudiences.map((a, idx) => ({
            id: a.id ? String(a.id) : `aud-${idx}`,
            name: a.name || a.title || "Learner",
            image: normalizeImageUrl(a.icon || a.image) || `${imageDirectory}/Students & Job Seekers.webp`,
            alt: `${a.name || "Audience"} icon`,
        }))
        : audiences;

    return (
        <ImageCardGrid
            headingId="audience-heading"
            title="Who is this course for?"
            description="Find your starting point and build the skills to work confidently with data."
            items={activeAudiences}
            countLabel="audiences"
            icon={FiUsers}
        />
    );
}
