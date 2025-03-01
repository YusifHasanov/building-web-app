import {Inter} from "next/font/google"
import "./globals.css"
import {Navigation} from "@/components/navigation"
import {Footer} from "@/components/footer"
import type React from "react"
import Script from "next/script";
import Head from "next/head"; // Import React

const inter = Inter({subsets: ["latin"], variable: "--font-inter"})

export const metadata = {
    title: "Baku Bau GmbH - Wir bauen Ihre Zukunft!",
    description: "Professionelle Bau- und Infrastrukturprojekte von Baku Bau GmbH",
    icons:{
        icon: "/favicon.png"
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="de" className={`${inter.variable}`}>
        <Script src="/assets/lang-config.js" strategy="beforeInteractive"/>
        <Script src="/assets/translation.js" strategy="beforeInteractive"/>
        <Script src="//translate.google.com/translate_a/element.js?cb=TranslateInit" strategy="afterInteractive"/>

        <body className="font-sans">
        <div id="google_translate_element"></div>
        <Navigation/>
        <main>


            {children}
        </main>
        <Footer/>
        </body>
        </html>
    )
}

