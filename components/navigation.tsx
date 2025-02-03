"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trans2-9Ea0kjnOIurFQVACPZjSNId0YgDXay.png"
                alt="Baku Bau GmbH Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-black hover:text-brand-yellow hover:bg-brand-black focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link href="/" className="text-brand-black hover:text-brand-yellow transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-brand-black hover:text-brand-yellow transition-colors">
              Über Uns
            </Link>
            <Link href="/services" className="text-brand-black hover:text-brand-yellow transition-colors">
              Leistungen
            </Link>
            <Link href="/projects" className="text-brand-black hover:text-brand-yellow transition-colors">
              Projekte
            </Link>
            <Link href="/contact" className="text-brand-black hover:text-brand-yellow transition-colors">
              Kontakt
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          <Link
            href="/"
            className="block px-3 py-2 text-brand-black hover:text-brand-yellow transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 text-brand-black hover:text-brand-yellow transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Über Uns
          </Link>
          <Link
            href="/services"
            className="block px-3 py-2 text-brand-black hover:text-brand-yellow transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Leistungen
          </Link>
          <Link
            href="/projects"
            className="block px-3 py-2 text-brand-black hover:text-brand-yellow transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Projekte
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 text-brand-black hover:text-brand-yellow transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Kontakt
          </Link>
        </div>
      </div>
    </nav>
  )
}

