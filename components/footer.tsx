import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trans0-cJO3yeHpjY1mhnSWkzby8c1fMNpA6v.png"
              alt="Baku Bau GmbH"
              width={150}
              height={50}
              className="mb-4"
            />
            <p className="text-gray-400">Ihr zuverlässiger Partner für Bau- und Infrastrukturprojekte</p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-brand-yellow" />
                <span>+49 1521 3007777</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-brand-yellow" />
                <span>info@bakubau.de</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-brand-yellow" />
                <span>50321 Bruhl Burg straße 3</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-brand-yellow transition-colors">
                  Über Uns
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-yellow transition-colors">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-brand-yellow transition-colors">
                  Projekte
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-yellow transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-brand-yellow transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/imprint" className="hover:text-brand-yellow transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-yellow transition-colors">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Baku Bau GmbH. Alle Rechte vorbehalten.</p>
          <p>&copy;  Site by Jeykhun Imanov Studio</p>
        </div>
      </div>
    </footer>
  )
}

