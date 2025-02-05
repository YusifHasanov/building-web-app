'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";


export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Zoom Animation */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
            >
                <Image
                    src="/HomeBg.png"
                    alt="Modern construction site"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-10 container mx-auto px-4 text-center text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                >
                    Wir bauen Ihre Zukunft!
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                >
                    Professionelle Bau- und Infrastrukturprojekte mit höchster Qualität und Zuverlässigkeit
                </motion.p>

                <motion.div
                    className="flex justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.1 }}
                >
                    <Button
                        asChild
                        size="lg"
                        className="bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 transition-transform transform hover:scale-105"
                    >
                        <Link href="/contact">Kontakt aufnehmen</Link>
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-white text-white hover:bg-white/10 transition-transform transform hover:scale-105"
                    >
                        <Link href="/projects">Projekte ansehen</Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}