import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          // src="https://kovaa.az/img/2023/12/cover-5.png"
          src="/HomeBg.png"
          alt="Modern construction site"
          fill
          className="object-cover object-center"
          priority
        />
        {/*<div className="absolute inset-0 bg-black/60" />*/}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trans0-cJO3yeHpjY1mhnSWkzby8c1fMNpA6v.png"
          alt="Baku Bau GmbH"
          width={400}
          height={200}
          className="mx-auto mb-12"
          priority
        />
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-up">Wir bauen Ihre Zukunft!</h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto animate-fade-up animation-delay-200">
          Professionelle Bau- und Infrastrukturprojekte mit höchster Qualität und Zuverlässigkeit
        </p>
        <div className="flex justify-center gap-4 animate-fade-up animation-delay-300">
          <Button asChild size="lg" className="bg-brand-yellow text-brand-black hover:bg-brand-yellow/90">
            <Link href="/contact">Kontakt aufnehmen</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link href="/projects">Projekte ansehen</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

