import Image from "next/image"

export function ProjectsHero() {
  return (
    <section className="relative h-[50vh] flex items-center justify-center">
      <Image src="https://img.freepik.com/free-photo/observation-urban-building-business-steel_1127-2397.jpg?semt=ais_hybrid" alt="Our Projects" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Unsere Projekte</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Entdecken Sie unsere beeindruckenden Bauprojekte und Erfolgsgeschichten.
        </p>
      </div>
    </section>
  )
}

