import { ServicesHero } from "@/components/services-hero"
import { ServicesList } from "@/components/services-list"
import { ProcessSection } from "@/components/process-section"

export const metadata = {
  title: "Leistungen - Baku Bau GmbH",
  description: "Entdecken Sie unsere umfassenden Bauleistungen und Expertise.",
}

export default function ServicesPage() {
  return (
    <div className="space-y-20 pb-20">
      <ServicesHero />
      <ServicesList />
      <ProcessSection />
    </div>
  )
}

