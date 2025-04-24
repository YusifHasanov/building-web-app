"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle } from "lucide-react"
import { BASE_URL } from "@/const"

interface Project {
    id: number | string;
    title: string;
    slug: string;
    description?: string;
    location?: string;
    thumbnail: string;
    status?: string;
    category?: string;
}

export function ProjectPreview() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(`${BASE_URL}/projects?limit=3`)
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`)
                }
                const result = await response.json()
                if (result && Array.isArray(result.data)) {
                    setProjects(result.data)
                } else {
                    throw new Error("Invalid data format received from API")
                }
            } catch (err) {
                console.error("Failed to fetch projects:", err)
                setError(err instanceof Error ? err.message : "Unknown error fetching projects")
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

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

                {loading && (
                    <div className="flex justify-center items-center py-10">
                        <Loader2 className="h-8 w-8 text-brand-yellow animate-spin" />
                        <span className="ml-3 text-gray-600">Projekte werden geladen...</span>
                    </div>
                )}

                {error && !loading && (
                    <div className="flex justify-center items-center py-10 text-red-600 bg-red-50 p-4 rounded-md">
                        <AlertCircle className="h-6 w-6 mr-2" />
                        <span>Fehler beim Laden der Projekte: {error}</span>
                    </div>
                )}

                {!loading && !error && projects.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <Link href={`/projects/${project.slug}`} key={project.id} passHref>
                                <motion.div
                                    initial={{opacity: 0, y: 50}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.2,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    viewport={{once: true}}
                                    whileHover={{y: -5, scale: 1.01}}
                                    className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col bg-white"
                                >
                                    <div className="relative h-60 w-full">
                                        <Image
                                            src={project.thumbnail || "/placeholder.svg"}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-lg font-bold text-white drop-shadow-md">
                                                {project.title}
                                            </h3>
                                            {(project.category || project.status || project.location) && (
                                                <p className="text-sm text-gray-200 mt-1">
                                                    {project.category || project.status || project.location}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {project.description && (
                                        <div className="p-4 border-t border-gray-100">
                                            <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                                        </div>
                                    )}
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                )}

                {!loading && !error && projects.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        Keine Projekte verfügbar.
                    </div>
                )}

                <motion.div
                    className="text-center mt-12"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.6}}
                    viewport={{once: true}}
                >
                    <Button
                        asChild
                        className="relative overflow-hidden group transition-all duration-300 ease-out hover:scale-105 bg-brand-yellow hover:bg-yellow-500 text-white px-6 py-3"
                    >
                        <Link href="/projects">
                            Alle Projekte ansehen
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

