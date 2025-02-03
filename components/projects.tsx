import Image from "next/image"

const projects = [
  {
    title: "Wohnkomplex Berlin",
    category: "Hochbau",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Brückensanierung Hamburg",
    category: "Infrastruktur",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Gewerbezentrum München",
    category: "Gewerbebau",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "U-Bahn Ausbau Frankfurt",
    category: "Tiefbau",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

export function Projects() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4">Unsere Projekte</h2>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            Entdecken Sie unsere erfolgreich abgeschlossenen Bauprojekte
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="group relative overflow-hidden rounded-lg">
              <Image
                src={project.imageUrl || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-200">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

