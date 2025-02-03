import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const projects = [
  {
    slug: "wohnkomplex-berlin",
    title: "Wohnkomplex Berlin-Mitte",
    description: "Neubau eines modernen Wohnkomplexes mit 120 Wohneinheiten",
    category: "Wohnungsbau",
    status: "Abgeschlossen",
    imageUrl: "https://kovaa.az/img/2023/12/4-2.jpg",
    year: "2023",
  },
  {
    slug: "brueckensanierung-hamburg",
    title: "Brückensanierung Hamburg",
    description: "Umfassende Sanierung der historischen Brückenanlage",
    category: "Infrastruktur",
    status: "In Bearbeitung",
    imageUrl: "https://img.freepik.com/premium-photo/tall-building-with-lot-windows-that-say-s-it_875037-8772.jpg?semt=ais_hybrid",
    year: "2024",
  },
  {
    title: "Bürokomplex München",
    description: "Nachhaltiger Gewerbebau mit modernster Technologie",
    category: "Gewerbebau",
    status: "Abgeschlossen",
    imageUrl: "https://img.freepik.com/free-psd/modern-white-apartment-building-exterior_191095-90745.jpg?semt=ais_hybrid",
    year: "2023",
    slug: "buero-muenchen",
  },
  {
    title: "U-Bahn Ausbau Frankfurt",
    description: "Erweiterung des öffentlichen Nahverkehrsnetzes",
    category: "Tiefbau",
    status: "In Planung",
    imageUrl: "https://img.freepik.com/premium-photo/low-angle-view-building-against-sky_1048944-23030262.jpg?semt=ais_hybrid",
    year: "2024",
    slug: "u-bahn-frankfurt",
  },
  {
    title: "Schulzentrum Stuttgart",
    description: "Neubau eines modernen Bildungscampus",
    category: "Öffentlicher Bau",
    status: "Abgeschlossen",
    imageUrl: "https://img.freepik.com/premium-photo/modern-urban-architectural-landscape-lianyungang-jiangsu-china_1417-11967.jpg?semt=ais_hybrid",
    year: "2023",
    slug: "schulzentrum-stuttgart",
  },
  {
    title: "Logistikzentrum Leipzig",
    description: "Großflächige Logistikimmobilie mit nachhaltiger Bauweise",
    category: "Industriebau",
    status: "In Bearbeitung",
    imageUrl: "/placeholder.svg?height=400&width=600",
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

