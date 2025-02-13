
import ProjectDetails from "@/components/projectDetails";

const constructionImages = [
    // Foundation Work
    {
        src: "/project_3_1.png",
        alt: "Foundation Work 1",
        category: "foundation",
        title: "Foundation Initial Phase",
    },
    {
        src: "/project_3_2.png",
        alt: "Foundation Work 2",
        category: "foundation",
        title: "Concrete Pouring",
    },
    {
        src: "/project_3_3.png",
        alt: "Foundation Work 3",
        category: "foundation",
        title: "Foundation Completion",
    },
    // Roof Work
    {
        src: "/project_3_4.png",
        alt: "Roof Construction 1",
        category: "roof",
        title: "Roof Frame Installation",
    },
    {
        src: "/project_3_5.png",
        alt: "Roof Construction 2",
        category: "roof",
        title: "Truss Assembly",
    },
    {
        src: "/project_3_7.png",
        alt: "Roof Construction 3",
        category: "roof",
        title: "Roofing Progress",
    },
    {
        src: "/project_3_8.png",
        alt: "Roof Construction 4",
        category: "roof",
        title: "Final Roof Stage",
    },
]

const categories = [
    { value: "foundation", label: "Foundation Work" },
    { value: "roof", label: "Roof Construction" },
]

const projectDetails = {
    title: "SCHLÜSSELFERTIG",
    location: "Pulheim, Germany",
    type: "Residential Building",
    badge: "IN PULHEIM",
    description:"  This residential construction project in Pulheim showcases our expertise in key phases of\n" +
        "                        building\n" +
        "                        development. From the crucial foundation work to the intricate roof construction, each stage\n" +
        "                        demonstrates our commitment to quality and precision. Our approach ensures a solid base and a\n" +
        "                        durable,\n" +
        "                        well-constructed roof, essential elements for a long-lasting and comfortable home.",
}

export default function ProjectDetailss() {
    return (
        <ProjectDetails categories={categories} images={constructionImages} projectDetails={projectDetails} />
    )
}

