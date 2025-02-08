import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const projects = [
  {
    title: "U-Bahn Ausbau Frankfurt",
    description: "Erweiterung des öffentlichen Nahverkehrsnetzes",
    category: "Tiefbau",
    status: "In Planung",
    imageUrl: "/project_1_logo.png",
    year: "2024",
    slug: "u-bahn-frankfurt",
  },
  {
    title: "Schulzentrum Stuttgart",
    description: "Neubau eines modernen Bildungscampus",
    category: "Öffentlicher Bau",
    status: "Abgeschlossen",
    imageUrl: "/project_2_logo.png",
    year: "2023",
    slug: "schulzentrum-stuttgart",
  },
  {
    title: "Logistikzentrum Leipzig",
    description: "Großflächige Logistikimmobilie mit nachhaltiger Bauweise",
    category: "Industriebau",
    status: "In Bearbeitung",
    imageUrl: "/project_3_logo.png",
    year: "2024",
    slug: "logistik-leipzig",
  },
  {
    title: "Logistikzentrum Leipzig",
    description: "Großflächige Logistikimmobilie mit nachhaltiger Bauweise",
    category: "Industriebau",
    status: "In Bearbeitung",
    imageUrl: "/project_4_logo.png",
    year: "2024",
    slug: "logistik-leipzig",
  },
]

export function ProjectGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10">
          {projects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.slug}>
              <Card className="overflow-hidden group h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={project.status === "Abgeschlossen" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>
                  <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{project.category}</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

