import Image from "next/image"

export function ContactHero() {
  return (
    <section className="relative h-[40vh] flex items-center justify-center">
      <Image src="/placeholder.svg?height=600&width=1200" alt="Contact Us" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontaktieren Sie uns</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Wir freuen uns darauf, von Ihnen zu hören und Ihr nächstes Bauprojekt zu besprechen.
        </p>
      </div>
    </section>
  )
}

