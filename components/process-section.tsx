import { CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  { title: "Beratung", description: "Wir besprechen Ihre Anforderungen und Ziele." },
  { title: "Planung", description: "Detaillierte Projektplanung und Kostenvoranschlag." },
  { title: "Ausführung", description: "Professionelle Umsetzung Ihres Projekts." },
  { title: "Qualitätskontrolle", description: "Strenge Qualitätsprüfungen während der Bauphase." },
  { title: "Übergabe", description: "Termingerechte Übergabe Ihres fertigen Projekts." },
]

export function ProcessSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Unser Arbeitsprozess</h2>
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start mb-8">
              <div className="flex-shrink-0 mr-4">
                <CheckCircle className="h-8 w-8 text-brand-yellow" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && <ArrowRight className="h-8 w-8 text-gray-300 mx-4 self-center" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

