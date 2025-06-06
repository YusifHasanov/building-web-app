"use client"

import {useEffect, useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {motion, AnimatePresence, useScroll, useTransform} from "framer-motion"
import {Button} from "@/components/ui/button"

// const backgroundImages = [
//    "/slide1.webp",
//    "/slide2.jpg",
//    "/slide3.jpg",
//    "/slide4.jpg",
// ]

export function Hero({sliderData}: any) {
    const [currentImage, setCurrentImage] = useState(0)
    const {scrollY} = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])

    console.log(sliderData)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % sliderData.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Parallax Background */}
            <motion.div className="absolute inset-0 z-0" style={{y}}>
                <AnimatePresence initial={false}>
                    <motion.div
                        key={sliderData[currentImage]?.image_url || "/placeholder.svg"}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 2, ease: [0.43, 0.13, 0.23, 0.96]}}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={sliderData[currentImage]?.image_url || "/placeholder.svg"}
                            alt="Background"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

            {/* Content */}
            <motion.div
                className="relative z-20 container mx-auto px-6 md:px-4 text-center text-white"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1.5, ease: "easeOut"}}
            >
                <motion.div
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1.2, delay: 0.5, ease: [0.6, -0.05, 0.01, 0.99]}}
                >
                    <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trans0-cJO3yeHpjY1mhnSWkzby8c1fMNpA6v.png"
                        alt="Baku Bau GmbH"
                        width={400}
                        height={200}
                        className="mx-auto mb-12"
                        priority
                    />
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1.2, delay: 0.7, ease: [0.6, -0.05, 0.01, 0.99]}}
                >
                    WIR AKTIVIEREN
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1.2, delay: 0.9, ease: [0.6, -0.05, 0.01, 0.99]}}
                >
                    IHR IMMOBILIENPOTENZIAL!
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 px-4 sm:px-0"
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1.2, delay: 1.1, ease: [0.6, -0.05, 0.01, 0.99]}}
                >
                    <Button
                        asChild
                        size="lg"
                        className="bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg w-full sm:w-auto"
                    >
                        <Link href="/contact">Kontakt aufnehmen</Link>
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-white text-white bg-white/20 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg w-full sm:w-auto"
                    >
                        <Link href="/projects">Projekte ansehen</Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    )
}
