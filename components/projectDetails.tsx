"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin } from "lucide-react"
import { ImageModal } from "@/components/image-modal"

interface ProjectImage {
    src: string
    alt: string
    category: string
    title: string
}

interface ProjectCategory {
    value: string
    label: string
}

interface ProjectDetailsProps {
    categories: ProjectCategory[]
    images: ProjectImage[]
    projectDetails: {
        title: string
        location: string
        type: string
        badge: string
        description: string
    }
}

export default function ProjectDetails({ categories, images, projectDetails }: ProjectDetailsProps) {
    const [modalOpen, setModalOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Image src="/logo.png" alt="Baku Bau" width={120} height={50} className="object-contain" />
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
                            <h1 className="text-4xl font-bold tracking-tight">{projectDetails.title}</h1>
                            <Badge variant="secondary" className="text-lg">
                                {projectDetails.badge}
                            </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                            <MapPin className="h-5 w-5" />
                            <span>{projectDetails.location}</span>
                            <Building2 className="h-5 w-5 ml-4" />
                            <span>{projectDetails.type}</span>
                        </div>
                    </div>

                    {/* Project Images */}
                    <Tabs defaultValue={categories[0]?.value || ""} className="space-y-6">
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
                                            {images
                                                .filter((img) => img.category === category.value)
                                                .map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative aspect-video cursor-pointer overflow-hidden rounded-lg group"
                                                        onClick={() => {
                                                            const globalIndex = images.findIndex((img) => img.src === image.src)
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
                            <p className="text-gray-600 leading-relaxed">{projectDetails.description}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Image Modal */}
                <ImageModal
                    images={images}
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    currentIndex={currentImageIndex}
                    onIndexChange={setCurrentImageIndex}
                />
            </main>
        </div>
    )
}