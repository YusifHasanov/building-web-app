import { Building2, Hammer, HardHat, Truck } from "lucide-react"

const services = [
  {
    title: "Hochbau",
    description: "Professionelle Planung und Ausführung von Gebäuden aller Art",
    icon: Building2,
  },
  {
    title: "Tiefbau",
    description: "Infrastrukturprojekte und Grundlagenarbeiten",
    icon: HardHat,
  },
  {
    title: "Renovierung",
    description: "Modernisierung und Sanierung bestehender Gebäude",
    icon: Hammer,
  },
  {
    title: "Transport",
    description: "Zuverlässiger Transport von Baumaterialien",
    icon: Truck,
  },
]

export function Services() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4">Unsere Leistungen</h2>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            Wir bieten ein umfassendes Portfolio an Bauleistungen für Ihre Projekte
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <service.icon className="h-12 w-12 text-brand-yellow mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-2">{service.title}</h3>
              <p className="text-brand-gray">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

