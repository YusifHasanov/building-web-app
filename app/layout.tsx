import {Inter} from "next/font/google"
import "./globals.css"
import {Navigation} from "@/components/navigation"
import {Footer} from "@/components/footer"
import type React from "react"
import Script from "next/script";

const inter = Inter({subsets: ["latin"], variable: "--font-inter"})

// Define default contact info for JSON-LD
const defaultContactInfoForSchema = {
    phone: "+49 1521 3000777",
    email: "info@bakubau.de",
    addressStreet: "Burgstraße 3",
    addressLocality: "Brühl",
    addressPostalCode: "50321",
    addressCountry: "DE"
};

// Define metadata object with SEO enhancements
export const metadata = {
    metadataBase: new URL('https://www.bakubau.de'), // Base URL for resolving relative images
    title: {
        default: "Baku Bau GmbH - Wir bauen Ihre Zukunft!", // Default title
        template: "%s | Baku Bau GmbH", // Template for page titles
    },
    description: "Baku Bau GmbH: Ihr zuverlässiger Partner für professionelle Bau- und Infrastrukturprojekte in Brühl und Umgebung. Hochbau, Sanierung, Modernisierung.",
    icons:{
        icon: "/favicon.png"
    },
    openGraph: {
        title: "Baku Bau GmbH - Wir bauen Ihre Zukunft!",
        description: "Professionelle Bau- und Infrastrukturprojekte von Baku Bau GmbH.",
        url: 'https://www.bakubau.de',
        siteName: 'Baku Bau GmbH',
        images: [
          {
            url: '/og-image.png', // Place an image at public/og-image.png (1200x630 recommended)
            width: 1200,
            height: 630,
          },
        ],
        locale: 'de_DE',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Baku Bau GmbH - Wir bauen Ihre Zukunft!",
        description: "Professionelle Bau- und Infrastrukturprojekte von Baku Bau GmbH.",
        images: ['/twitter-image.png'], // Place an image at public/twitter-image.png
      },
    // Add other metadata fields like keywords if desired
    // keywords: ["Bauunternehmen", "Brühl", "Hochbau", "Sanierung", "Infrastruktur"],
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    // Generate JSON-LD Schema
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ConstructionBusiness',
      name: 'Baku Bau GmbH',
      image: 'https://www.bakubau.de/logo.png', // Ensure logo exists at public/logo.png
      '@id': 'https://www.bakubau.de',
      url: 'https://www.bakubau.de',
      telephone: defaultContactInfoForSchema.phone,
      email: defaultContactInfoForSchema.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: defaultContactInfoForSchema.addressStreet,
        addressLocality: defaultContactInfoForSchema.addressLocality,
        postalCode: defaultContactInfoForSchema.addressPostalCode,
        addressCountry: defaultContactInfoForSchema.addressCountry,
      },
      // openingHoursSpecification: [ ... ] // Can be added later if needed
    }

    return (
        <html lang="de" className={`${inter.variable}`}>
        <head>
            {/* Add JSON-LD to head */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </head>
        <body className="font-sans">
        <div id="google_translate_element"></div>
        <Navigation/>
        <main>
            {children}
        </main>
        <Footer/>
        <Script src="/assets/lang-config.js" strategy="beforeInteractive"/>
        <Script src="/assets/translation.js" strategy="beforeInteractive"/>
        <Script src="//translate.google.com/translate_a/element.js?cb=TranslateInit" strategy="afterInteractive"/>
        </body>
        </html>
    )
}

