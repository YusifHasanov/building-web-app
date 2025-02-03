import { Building2, Users, Award, TrendingUp } from "lucide-react"

const stats = [
  { label: "Abgeschlossene Projekte", value: "500+", icon: Building2 },
  { label: "Zufriedene Kunden", value: "1000+", icon: Users },
  { label: "Jahre Erfahrung", value: "25+", icon: Award },
  { label: "Jährliches Wachstum", value: "15%", icon: TrendingUp },
]

export function Stats() {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-12 w-12 mx-auto mb-4 text-brand-black" />
              <p className="text-4xl font-bold text-brand-black mb-2">{stat.value}</p>
              <p className="text-lg text-brand-black/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

