import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ContactCTA() {
  return (
    <section className="py-20 bg-brand-yellow">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-brand-black">Bereit für Ihr nächstes Projekt?</h2>
        <p className="text-xl mb-8 text-brand-black/80">
          Kontaktieren Sie uns noch heute für eine kostenlose Beratung.
        </p>
        <Button asChild size="lg" className="bg-brand-black text-white hover:bg-brand-black/90">
          <Link href="/contact">Jetzt Kontakt aufnehmen</Link>
        </Button>
      </div>
    </section>
  )
}

