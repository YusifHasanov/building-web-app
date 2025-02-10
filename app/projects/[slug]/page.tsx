import {ProjectDetails} from "@/components/project-details"
import {notFound} from "next/navigation"

// Bu fonksiyon gerçek bir API çağrısı veya veritabanı sorgusu ile değiştirilmelidir
async function getProjectBySlug(slug: string) {


    const projects = [
        {
            slug: "sanierungen-modernisierungen",
            title: "Sanierungen, Modernisierungen",
            description: "Erweiterung des öffentlichen Nahverkehrsnetzes",
            client: "BerlinHomes GmbH",
            location: "Berlin, Deutschland",
            year: "2024",
            services: ["Architektur", "Bauausführung", "Projektmanagement"],
            images: [
                '/project_1_logo.png',
                '/project_1_1.png',
                '/project_1_2.png',
            ],
        },
        {
            slug: "estricharbeiten",
            title: "Estricharbeiten",
            description: "Neubau eines modernen Bildungscampus",
            client: "BerlinHomes GmbH",
            location: "Berlin, Deutschland",
            year: "2023",
            services: ["Architektur", "Bauausführung", "Projektmanagement"],
            images: [
                '/project_2_1.png',
                '/project_2_2.png',
                '/project_2_3.png',
                '/project_2_4.png',
                '/project_2_5.png',
                '/project_2_6.png',


            ],
        },
        {
            slug: "schlusselfertiger-bau",
            title: "Schlüsselfertiger Bau",
            description: "Großflächige Logistikimmobilie mit nachhaltiger Bauweise",
            client: "BerlinHomes GmbH",
            location: "Berlin, Deutschland",
            year: "2024",
            services: ["Architektur", "Bauausführung", "Projektmanagement"],
            images: [
                '/project_3_1.png',
                '/project_3_2.png',
                '/project_3_3.png',
                '/project_3_4.png',
                '/project_3_5.png',
                '/project_3_6.png',
                '/project_3_7.png',
                '/project_3_8.png',
            ],
        },
        {
            slug: "diverse-kleinprojekte",
            title: "Diverse Kleinprojekte",
            description: "Großflächige Logistikimmobilie mit nachhaltiger Bauweise",
            client: "BerlinHomes GmbH",
            location: "Berlin, Deutschland",
            year: "2024",
            services: ["Architektur", "Bauausführung", "Projektmanagement"],
            images: [],
        },
    ]

    return projects.find((project) => project.slug === slug)
}

export default async function ProjectPage({params}: { params: { slug: string } }) {
    const project = await getProjectBySlug(params.slug)

    if (!project) {
        notFound()
    }

    return <div className={"pt-10"}>
        <ProjectDetails project={project}/>
    </div>
}

