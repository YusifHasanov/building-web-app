import { ProjectsHero } from "@/components/projects-hero"
import { ProjectGrid } from "@/components/project-grid"

export const metadata = {
  title: "Projekte - Baku Bau GmbH",
  description: "Sehen Sie unsere erfolgreich abgeschlossenen Bauprojekte.",
}

export default function ProjectsPage() {
  return (
    <div className="space-y-20 pb-20">
      <ProjectsHero />
      <ProjectGrid />
    </div>
  )
}

