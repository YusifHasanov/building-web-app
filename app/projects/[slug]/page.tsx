import { ProjectDetails } from "@/components/project-details"
import { notFound } from "next/navigation"

// Bu fonksiyon gerçek bir API çağrısı veya veritabanı sorgusu ile değiştirilmelidir
async function getProjectBySlug(slug: string) {
  const projects = [
    {
      slug: "wohnkomplex-berlin",
      title: "Wohnkomplex Berlin",
      description: "Ein moderner Wohnkomplex mit 120 Wohneinheiten im Herzen von Berlin.",
      client: "BerlinHomes GmbH",
      location: "Berlin, Deutschland",
      year: "2023",
      services: ["Architektur", "Bauausführung", "Projektmanagement"],
      images: [
        "https://images.unsplash.com/photo-1435575653489-b0873ec954e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1aWxkaW5nfGVufDB8fDB8fHww",
        "https://plus.unsplash.com/premium_photo-1680582107403-04dfac02efc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGJ1aWxkaW5nfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1aWxkaW5nfGVufDB8fDB8fHww",
      ],
    },
    // Diğer projeler buraya eklenebilir
  ]

  return projects.find((project) => project.slug === slug)
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetails project={project} />
}

