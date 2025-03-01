import Image from "next/image"

export function ServicesHero() {
  return (
    <section className="relative h-[40vh] flex mt-20 items-center justify-center">
      <Image src="/servce.jpg" alt="Our Services" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Unsere Leistungen</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Entdecken Sie unser umfassendes Angebot an Bau- und Infrastrukturdienstleistungen.
        </p>
      </div>
    </section>
  )
}

