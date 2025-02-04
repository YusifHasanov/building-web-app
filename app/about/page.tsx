import { AboutHero } from "@/components/about-hero"
import Image from "next/image";
import {Button} from "@/components/ui/button";


export const metadata = {
  title: "Über Uns - Baku Bau GmbH",
  description: "Erfahren Sie mehr über Baku Bau GmbH, unsere Geschichte und unser Team.",
}

export default function AboutPage() {
  return (
      <div className="space-y-20 pt-20 pb-20">
          {/*<AboutHero />*/}
          {/*<CompanyHistory />*/}
          {/*<Values />*/}
          {/*<TeamSection />*/}
          <section className="max-w-4xl mx-auto px-6 py-12 text-center">
              <h1 className="text-4xl font-bold mb-6 text-brand-black">Über Uns</h1>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  Willkommen bei <span className="font-semibold">Bakubau</span>! Wir sind ein engagiertes Team, das es
                  sich zur Aufgabe gemacht hat,
                  qualitativ hochwertige Bauprojekte zu realisieren. Mit unserer langjährigen Erfahrung und
                  einem kreativen Ansatz setzen wir Ihre Ideen in die Realität um.
              </p>

              <div className="flex flex-col md:flex-row items-center gap-8">
                  <Image
                      src="/team.jpg"
                      alt="Unser Team"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-lg"
                  />
                  <div className="text-left max-w-md">
                      <h2 className="text-2xl font-semibold text-brand-black mb-4">Unsere Mission</h2>
                      <p className="text-gray-600 leading-relaxed">
                          Unser Ziel ist es, innovative und nachhaltige Lösungen für Bauprojekte
                          zu liefern. Wir legen Wert auf höchste Qualität, transparente Kommunikation
                          und effiziente Umsetzung.
                      </p>
                      <Button className="mt-6 bg-brand-yellow text-brand-black hover:bg-brand-yellow/90">
                          Mehr Erfahren
                      </Button>
                  </div>
              </div>
          </section>
      </div>
  )
}

