"use client"

import {useRef} from "react"
import Image from "next/image"
import Link from "next/link"
import {motion, useScroll, useTransform} from "framer-motion"
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation";

const projects = [
    {
        title: "60 Rudeltstraße",
        category: "Hochbau",
        imageUrl: "/prj2.jpeg",
        slug: "sanierungen-modernisierungen",
    },
    {
        title: "4A Johannisstraße",
        category: "Infrastruktur",
        imageUrl: "/prj3.jpeg",
        slug: "estricharbeiten",
    },
    {
        title: "1 Johannisstraße",
        category: "Gewerbebau",
        imageUrl: "/prj4.jpeg",
        slug: "schlusselfertiger-bau",
    }
]

export function ProjectPreview() {
    const containerRef = useRef<HTMLDivElement>(null)
    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })
    const router = useRouter()
    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    // @ts-ignore
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
            <div ref={containerRef} className="container mx-auto px-4">
                <motion.h2
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, ease: [0.16, 1, 0.3, 1]}}
                    viewport={{once: true}}
                    className="text-4xl font-bold text-center mb-12 text-gray-800"
                >
                    Unsere Projekte
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{opacity: 0, y: 50}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            viewport={{once: true}}
                            whileHover={{y: -8, scale: 1.02}}
                            className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-500"
                        >
                            <motion.div
                                className="relative h-72"
                                style={{y: index * 50 * scrollYProgress}}
                            >
                                <Image src={project.imageUrl || "/placeholder.svg"} alt={project.title} fill
                                       className="object-cover"/>
                                <motion.div
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.6, delay: 0.3 + index * 0.2}}
                                    viewport={{once: true}}
                                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
                                >
                                    <div className="absolute inset-0 flex flex-col hover:cursor-pointer justify-end p-6">
                                        <motion.h3
                                            initial={{opacity: 0, x: -20}}
                                            whileInView={{opacity: 1, x: 0}}
                                            transition={{duration: 0.6, delay: 0.4 + index * 0.2}}
                                            viewport={{once: true}}
                                            className="text-xl font-bold text-white drop-shadow-lg"
                                        >
                                            {project.title}
                                        </motion.h3>
                                        <motion.p
                                            initial={{opacity: 0, x: -20}}
                                            whileInView={{opacity: 1, x: 0}}
                                            transition={{duration: 0.6, delay: 0.5 + index * 0.2}}
                                            viewport={{once: true}}
                                            className="text-sm text-gray-200 mt-2"
                                        >
                                            {project.category}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-12"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.6}}
                    viewport={{once: true}}
                >
                    <Button
                        asChild
                        className="relative overflow-hidden group transition-all duration-300 ease-out hover:scale-105"
                    >
                        <Link href="/projects">
                            <motion.span initial={{y: "100%"}} animate={{y: 0}} transition={{duration: 0.5}}>
                                Alle Projekte ansehen
                            </motion.span>
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

