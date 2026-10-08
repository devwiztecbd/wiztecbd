import { FiGrid } from "react-icons/fi";
import ImageCardGrid from "./ImageCardGrid";

const imageDirectory = "/assets/icons/CoursePage/Data Analytics Course/Softwares & Tools You’ll Learn";

// Local images keep the software design preview independent of the API.
const softwares = [
    { id: "power-bi", name: "Power BI", image: "Power BI & Tableau.webp" },
    { id: "excel", name: "Google Sheets & Excel", image: "Google Sheets & Excel.webp" },
    { id: "sql", name: "SQL & PostgreSQL", image: "SQL & PostgreSQL.webp" },
    { id: "python", name: "Python", image: "Python (Pandas, NumPy, Matplotlib, Seaborn).webp" },
    { id: "jupyter", name: "Jupyter Notebook", image: "Jupyter Notebook.webp" },
    { id: "analytics", name: "Google Analytics & Data Studio", image: "Google Analytics & Data Studio.webp" },
].map((software) => ({ ...software, image: `${imageDirectory}/${software.image}`, alt: `${software.name} logo` }));

export default function SoftwareGrid() {
    return (
        <ImageCardGrid
            headingId="software-heading"
            title="Software you’ll learn"
            description="Get familiar with the tools that turn data into insights."
            items={softwares}
            countLabel="tools"
            icon={FiGrid}
        />
    );
}
