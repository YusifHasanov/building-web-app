import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Wohnkomplex Berlin",
    category: "Hochbau",
    imageUrl: "https://kovaa.az/img/2023/12/1-3.jpg",
  },
  {
    title: "Brückensanierung Hamburg",
    category: "Infrastruktur",
    imageUrl: "https://kovaa.az/img/2023/12/1-3.jpg",
  },
  {
    title: "Bürokomplex München",
    category: "Gewerbebau",
    imageUrl: "https://kovaa.az/img/2023/12/1-3.jpg",
  },
];

export function ProjectPreview() {
  return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Unsere Projekte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
                <div
                    key={project.title}
                    className="group relative overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-72">
                    <Image
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4 transition-colors duration-300 group-hover:from-black/70">
                      <h3 className="text-xl font-bold text-white drop-shadow">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-200">{project.category}</p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/projects">Alle Projekte ansehen</Link>
            </Button>
          </div>
        </div>
      </section>
  );
}