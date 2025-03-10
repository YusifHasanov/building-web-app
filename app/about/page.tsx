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
                  Die Baku Bau GmbH ist ein modernes Hoch-Bauunternehmen mit langer Erfahrung in Köln und Umgebung.

                  Wir kümmern uns um alles, was Sie für Ihren Neubau oder Ihren Umbau inklusive umfangreiche Sanierungsvorhaben benötigen:
              </p>

              <div className="flex flex-col md:flex-row items-center gap-8">
                  <Image
                      src="/trans2.png"
                      alt="Unser Team"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-lg"
                  />
                  <div className="text-left max-w-md">
                      <h2 className="text-2xl font-semibold text-brand-black mb-4">Unsere Mission</h2>
                      <p className="text-gray-600 leading-relaxed">
                          Von der Immobilienentwicklung über die finanzielle Planung inkl. Förderungsberatung bis hin zur schlüsselfertigen Ausführung. Vom Einfamilienhaus über Mehrfamilienhäuser bis hin zu Großbau-Projekten stehen wir an Ihrer Seite und zu unserem Wort.
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

