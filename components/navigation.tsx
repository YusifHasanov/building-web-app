"use client";

import { useState, Fragment } from "react"; // Import Fragment for Transition
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher"; // Adjust path if needed
import { usePathname } from "next/navigation";
import { Transition } from '@headlessui/react'; // Using Headless UI for smoother transitions

// Define menu items once
const menuItems = [
  { name: "Home", path: "/" },
  { name: "Über Uns", path: "/about" },
  { name: "Leistungen", path: "/services" },
  { name: "Projekte", path: "/projects" },
  { name: "Kontakt", path: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get active path

  const linkClasses = (path: string) =>
      `capitalize relative text-md font-medium text-brand-black transition-colors duration-200 ease-in-out hover:text-brand-yellow focus:outline-none focus:text-brand-yellow
     after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-yellow after:transition-all after:duration-300 hover:after:w-full
     ${pathname === path ? "text-brand-yellow after:w-full font-semibold" : ""}`;

  const mobileLinkClasses = (path: string) =>
      `block rounded-md px-3 py-2 text-base font-medium text-brand-black transition-colors duration-200 hover:bg-gray-100 hover:text-brand-yellow
     ${pathname === path ? "bg-yellow-50 text-brand-yellow font-semibold" : ""}`;

  return (
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18"> {/* Slightly reduced height */}
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow rounded-md">
                <Image
                    src="/trans2.png" // Use your local path
                    alt="Baku Bau GmbH Logo"
                    width={140} // Slightly adjusted size
                    height={45}
                    className="h-10 md:h-12 w-auto" // Responsive height
                    priority // Add priority for LCP element
                />
              </Link>
            </div>

            {/* Desktop Menu & Language Switcher */}
            <div className="hidden lg:flex lg:items-center lg:ml-6 lg:space-x-6 xl:space-x-8"> {/* Adjusted spacing */}
              {menuItems.map((item) => (
                  <Link key={item.path} href={item.path} className={linkClasses(item.path)}>
                    {item.name}
                  </Link>
              ))}
              {/* Language Switcher - Desktop */}
              <div className="ml-4">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              {/* Language Switcher - Mobile (optional placement next to burger) */}
              {/* <div className="mr-2">
                 <LanguageSwitcher />
             </div> */}
              <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-yellow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-yellow"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu using Headless UI Transition */}
        <Transition
            show={isOpen}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
        >
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                  <Link
                      key={item.path}
                      href={item.path}
                      className={mobileLinkClasses(item.path)}
                      onClick={() => setIsOpen(false)} // Close menu on click
                  >
                    {item.name}
                  </Link>
              ))}
            </div>
            {/* Mobile menu - Language Switcher */}
            <div className="px-5 pt-2 pb-4 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-2">Sprache wählen</p>
              <LanguageSwitcher />
            </div>
          </div>
        </Transition>
      </nav>
  );
}
