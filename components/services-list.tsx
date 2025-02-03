import { Building2, Hammer, HardHat, Truck, RouteIcon as Road, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "Hochbau",
    description:
      "Professionelle Planung und Ausführung von Gebäuden aller Art, von Wohnhäusern bis zu Gewerbeimmobilien.",
    icon: Building2,
    features: ["Wohnungsbau", "Gewerbebau", "Industriebau", "Öffentliche Gebäude"],
  },
  {
    title: "Tiefbau",
    description: "Umfassende Infrastrukturprojekte und Grundlagenarbeiten für sichere und nachhaltige Bauvorhaben.",
    icon: HardHat,
    features: ["Fundamentarbeiten", "Kanalbau", "Straßenbau", "Erdarbeiten"],
  },
  {
    title: "Renovierung",
    description: "Fachgerechte Modernisierung und Sanierung bestehender Gebäude mit modernster Technik.",
    icon: Hammer,
    features: ["Fassadensanierung", "Energetische Sanierung", "Innenausbau", "Modernisierung"],
  },
  {
    title: "Infrastruktur",
    description: "Entwicklung und Umsetzung von Infrastrukturprojekten für die Anforderungen von morgen.",
    icon: Road,
    features: ["Verkehrsinfrastruktur", "Ver- und Entsorgung", "Brückenbau", "Tunnelbau"],
  },
  {
    title: "Transport",
    description: "Zuverlässiger Transport von Baumaterialien und Baumaschinen mit eigenem Fuhrpark.",
    icon: Truck,
    features: ["Materialtransport", "Maschinentransport", "Entsorgung", "Logistik"],
  },
  {
    title: "Qualitätssicherung",
    description: "Kontinuierliche Qualitätskontrolle und Projektüberwachung für optimale Ergebnisse.",
    icon: Shield,
    features: ["Bauüberwachung", "Qualitätskontrollen", "Dokumentation", "Abnahmen"],
  },
]

export function ServicesList() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <service.icon className="h-12 w-12 text-brand-yellow mb-4" />
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-600">
                      <span className="h-1.5 w-1.5 bg-brand-yellow rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

