"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin } from "lucide-react"
import { ImageModal } from "@/components/image-modal"

const constructionImages = [
    // Foundation Work
    {
        src: "/project_3_1.png",
        alt: "Foundation Work 1",
        category: "foundation",
        title: "Foundation Initial Phase",
    },
    {
        src: "/project_3_2.png",
        alt: "Foundation Work 2",
        category: "foundation",
        title: "Concrete Pouring",
    },
    {
        src: "/project_3_3.png",
        alt: "Foundation Work 3",
        category: "foundation",
        title: "Foundation Completion",
    },
    // Roof Work
    {
        src: "/project_3_4.png",
        alt: "Roof Construction 1",
        category: "roof",
        title: "Roof Frame Installation",
    },
    {
        src: "/project_3_5.png",
        alt: "Roof Construction 2",
        category: "roof",
        title: "Truss Assembly",
    },
    {
        src: "/project_3_7.png",
        alt: "Roof Construction 3",
        category: "roof",
        title: "Roofing Progress",
    },
    {
        src: "/project_3_8.png",
        alt: "Roof Construction 4",
        category: "roof",
        title: "Final Roof Stage",
    },
]

const categories = [
    { value: "foundation", label: "Foundation Work" },
    { value: "roof", label: "Roof Construction" },
]

export default function ProjectDetails() {
    const [modalOpen, setModalOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Image src="/logo.png" alt="M.O.S Projekt Plan GmbH" width={120} height={50} className="object-contain" />
                        </div>
                        <div className="hidden sm:flex sm:space-x-8 items-center">
                            {["UNTERNEHMEN", "LEISTUNGEN", "KARRIERE", "PROJEKTE", "KONTAKT"].map((item) => (
                                <a key={item} href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Project Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-8">
                    {/* Project Header */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-4xl font-bold tracking-tight">SCHLÜSSELFERTIG</h1>
                            <Badge variant="secondary" className="text-lg">
                                IN PULHEIM
                            </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                            <MapPin className="h-5 w-5" />
                            <span>Pulheim, Germany</span>
                            <Building2 className="h-5 w-5 ml-4" />
                            <span>Residential Building</span>
                        </div>
                    </div>

                    {/* Project Images */}
                    <Tabs defaultValue="foundation" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2">
                            {categories.map((category) => (
                                <TabsTrigger key={category.value} value={category.value}>
                                    {category.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {categories.map((category) => (
                            <TabsContent key={category.value} value={category.value}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">{category.label}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {constructionImages
                                                .filter((img) => img.category === category.value)
                                                .map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative aspect-video cursor-pointer overflow-hidden rounded-lg group"
                                                        onClick={() => {
                                                            const globalIndex = constructionImages.findIndex((img) => img.src === image.src)
                                                            setCurrentImageIndex(globalIndex)
                                                            setModalOpen(true)
                                                        }}
                                                    >
                                                        <Image
                                                            src={image.src || "/placeholder.svg"}
                                                            alt={image.alt}
                                                            fill
                                                            className="object-cover transition-transform group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                                                            <p className="text-white p-4 text-sm">{image.title}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>

                    {/* Project Details */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                            <p className="text-gray-600 leading-relaxed">
                                This residential construction project in Pulheim showcases our expertise in key phases of building
                                development. From the crucial foundation work to the intricate roof construction, each stage
                                demonstrates our commitment to quality and precision. Our approach ensures a solid base and a durable,
                                well-constructed roof, essential elements for a long-lasting and comfortable home.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Image Modal */}
                <ImageModal
                    images={constructionImages}
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    currentIndex={currentImageIndex}
                    onIndexChange={setCurrentImageIndex}
                />
            </main>
        </div>
    )
}

