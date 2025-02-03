import { Carousel } from "@/components/ui/carousel"

type Project = {
  title: string
  description: string
  client: string
  location: string
  year: string
  services: string[]
  images: string[]
}

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
      <Carousel images={project.images} />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Projektbeschreibung</h2>
          <p className="text-gray-600">{project.description}</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Erbrachte Leistungen</h2>
          <ul className="list-disc list-inside text-gray-600">
            {project.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Projektdetails</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="mb-2">
              <strong>Kunde:</strong> {project.client}
            </p>
            <p className="mb-2">
              <strong>Standort:</strong> {project.location}
            </p>
            <p className="mb-2">
              <strong>Jahr:</strong> {project.year}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

