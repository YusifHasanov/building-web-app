import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const projects = [
  {
    title: "Sanierungen, Modernisierungen",
    description: "Freital, Sachsen",
    category: "Tiefbau",
    status: "In Planung",
    imageUrl: "/prj1.jpeg",
    year: "2024",
    slug: "sanierungen-modernisierungen",
  },
  {
    title: "60 Rudeltstraße",
    description: "Freital, Sachsen",
    category: "Tiefbau",
    status: "In Planung",
    imageUrl: "/prj2.jpeg",
    year: " 29 Kas 2024 14:08:57",
    slug: "sanierungen-modernisierungen",
  },
  {

    title: "4A Johannisstraße",
    description: "Freital, Sachsen",
    category: "Öffentlicher Bau",
    status: "Abgeschlossen",
    imageUrl: "/prj3.jpeg",
    year: "29 Kas 2024 14:51:25",
    slug: "estricharbeiten",
  },

  {
    title:  "1 Johannisstraße",
    description: "Freital, Sachsen",
    category: "Industriebau",
    status: "In Bearbeitung",
    imageUrl: "/prj4.jpeg",
    year: "23 Kas 2024 12:53:38",
    slug: "schlusselfertiger-bau",
  },
  {
    title: "Diverse Kleinprojekte",
    description: "Freital, Sachsen",
    category: "Industriebau",
    status: "In Bearbeitung",
    imageUrl: "/prj5.jpeg",
    year: "2024",
    slug: "diverse-kleinprojekte",
  },
]

export function ProjectGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10">
          {projects.map((project) => (
            // <Link href={`/projects/${project.slug}`} key={project.slug}>
              <Card className="overflow-hidden group h-full">
                <div className="relative  h-96 overflow-hidden">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    {/*<Badge variant={project.status === "Abgeschlossen" ? "default" : "secondary"}>*/}
                    {/*  {project.status}*/}
                    {/*</Badge>*/}
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>
                  <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{project.category}</Badge>
                </CardContent>
              </Card>
            // </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

