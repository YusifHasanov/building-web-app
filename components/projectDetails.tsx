"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Calendar, ArrowLeft, Loader2, Info, X } from "lucide-react"
import { ImageModal } from "@/components/image-modal"
import { BASE_URL } from '@/const'

interface ProjectImage {
    id: number
    category_value: string
    src: string
    alt: string
    title: string
    sort_order: number
}

interface ProjectCategory {
    id: number
    value: string
    label: string
}

interface ProjectDetailsData {
    id: number
    title: string
    slug: string
    description: string
    location: string
    content: string | null
    thumbnail: string
    status: string
    created_at: string
    updated_at: string
    categories: ProjectCategory[]
    images: ProjectImage[]
}

interface ApiResponse {
    data?: ProjectDetailsData
    success: boolean
    message?: string
}

// Helper function to create/update JSON-LD script
function updateProjectJsonLd(project: ProjectDetailsData | null) {
    // Remove previous project script if it exists
    const existingScript = document.getElementById('project-json-ld');
    if (existingScript) {
        existingScript.remove();
    }

    if (!project) {
        return; // Do nothing if no project data
    }

    // Construct the JSON-LD data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product', // Or potentially 'CreativeWork' or a more specific type
        name: project.title,
        description: project.description,
        image: project.thumbnail, // Use project thumbnail
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bakubau.de'}/projects/${project.slug}`, // Construct URL
        // Add other relevant properties like brand, offers, etc. if applicable
        // brand: {
        //     '@type': 'Brand',
        //     name: 'Baku Bau GmbH'
        // }
    };

    // Create and append the new script tag
    const script = document.createElement('script');
    script.id = 'project-json-ld';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);
}

export default function ProjectDetails({ slug }: { slug: string }) {
    const [project, setProject] = useState<ProjectDetailsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (!slug) {
            setLoading(false);
            setError("Project slug is missing.");
            return;
        }

        const fetchProjectDetails = async () => {
            setLoading(true);
            setError(null);
            setProject(null);
            try {
                const response = await fetch(`${BASE_URL}/projects/${slug}`);

                if (!response.ok) {
                    if (response.status === 404) {
                         setError("Project not found.");
                    } else {
                         let errorMsg = `Failed to fetch project: ${response.status}`;
                         try {
                             const errorData = await response.json();
                             errorMsg = errorData.message || errorMsg;
                         } catch (e) { /* Ignore if response body can't be parsed */ }
                         setError(errorMsg);
                    }
                    setLoading(false);
                    return;
                }

                const result: ApiResponse = await response.json();

                console.log(result);

                if ( result.data) {
                     setProject(result.data);
                } else {
                     setError(result.message || "Failed to load project details or project not found.");
                     console.warn("API Response indicate failure or missing data:", result);
                }

            } catch (err) {
                console.error("Error fetching project details:", err);
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [slug]);

    useEffect(() => {
        if (project && project.title) {
            document.title = `${project.title} - Projektdetails | Baku Bau GmbH`;
        }
    }, [project]);

    // useEffect to update JSON-LD script
    useEffect(() => {
        updateProjectJsonLd(project); // Call helper function

        // Cleanup function to remove script when component unmounts or project changes
        return () => {
            updateProjectJsonLd(null); // Pass null to remove script
        };
    }, [project]); // Run when project state changes

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-12 w-12 text-brand-yellow animate-spin" />
                    <p className="text-lg text-gray-600">Projekt wird geladen...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-red-100 p-3 rounded-full">
                            <Info className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-4">Fehler beim Laden</h2>
                    <p className="text-gray-600 text-center mb-6">{error}</p>
                    <div className="flex justify-center">
                        <Link href="/projects" className="bg-brand-yellow text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Zurück zu Projekten
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
             <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                 <p className="text-gray-600">Projekt konnte nicht geladen werden.</p>
             </div>
        );
    }

    const statusColors: Record<string, string> = {
        "Abgeschlossen": "bg-green-100 text-green-800",
        "In Bearbeitung": "bg-blue-100 text-blue-800",
        "In Planung": "bg-amber-100 text-amber-800"
    };

    const formattedDate = new Date(project.created_at).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative h-[50vh] w-full bg-gray-900">
                <Image
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover opacity-70"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                    <div className="max-w-7xl mx-auto">
                        <Link href="/projects" className="inline-flex items-center text-white mb-6 hover:text-brand-yellow transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Zurück zur Projektübersicht
                        </Link>

                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-3xl capitalize md:text-5xl font-bold text-white">{project.title}</h1>
                                <div className={`${statusColors[project.status] || "bg-gray-100 text-gray-800"} px-3 py-1 rounded-full text-sm font-medium`}>
                                    {project.status}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-white/90">
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 mr-1" />
                                    <span>{project.location}</span>
                                </div>

                                <div className="flex items-center">
                                    <Calendar className="h-5 w-5 mr-1" />
                                    <span>{formattedDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-1">
                        <Card className="sticky top-8">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-4 border-b pb-2">Projektdetails</h2>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm text-gray-500 font-medium mb-1">Standort</h3>
                                        <p className="flex items-center text-gray-800">
                                            <MapPin className="h-4 w-4 mr-1 text-brand-yellow" />
                                            {project.location}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm text-gray-500 font-medium mb-1">Status</h3>
                                        <div className={`inline-flex capitalize items-center ${statusColors[project.status] || "bg-gray-100 text-gray-800"} px-2 py-1 rounded-full text-xs font-medium`}>
                                            {project.status}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm text-gray-500 font-medium mb-1">Datum</h3>
                                        <p className="flex items-center text-gray-800">
                                            <Calendar className="h-4 w-4 mr-1 text-brand-yellow" />
                                            {formattedDate}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-2 space-y-8">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold mb-4">Über das Projekt</h2>
                                <p className="text-gray-700 leading-relaxed">{project.description}</p>
                                {project.content && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div dangerouslySetInnerHTML={{ __html: project.content }} className="prose max-w-none" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {project.categories.length > 0 && project.images.length > 0 && (
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-2xl font-bold mb-4">Projektbilder</h2>

                                    <Tabs defaultValue={project.categories[0]?.value || ""} className="space-y-6">
                                        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${project.categories.length}, minmax(0, 1fr))` }}>
                                            {project.categories.map((category) => (
                                                <TabsTrigger key={category.id} value={category.value} className="flex-1">
                                                    {category.label}
                                                </TabsTrigger>
                                            ))}
                                        </TabsList>

                                        {project.categories.map((category) => {
                                            const categoryImages = project.images.filter(img => img.category_value === category.value);

                                            return (
                                                <TabsContent key={category.id} value={category.value}>
                                                    {categoryImages.length > 0 ? (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {categoryImages
                                                                .sort((a, b) => a.sort_order - b.sort_order)
                                                                .map((image, index) => (
                                                                    <div
                                                                        key={image.id}
                                                                        className="relative aspect-video cursor-pointer overflow-hidden rounded-lg group shadow-md hover:shadow-xl transition-all"
                                                                        onClick={() => {
                                                                            const globalIndex = project.images.findIndex((img) => img.id === image.id);
                                                                            setCurrentImageIndex(globalIndex);
                                                                            setModalOpen(true);
                                                                        }}
                                                                    >
                                                                        <Image
                                                                            src={image.src || "/placeholder.svg"}
                                                                            alt={image.alt}
                                                                            fill
                                                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                                        />
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                                                                            <p className="text-white p-4 text-sm font-medium">{image.title}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    ) : (
                                                        <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
                                                            <p>Keine Bilder für diese Kategorie verfügbar.</p>
                                                        </div>
                                                    )}
                                                </TabsContent>
                                            );
                                        })}
                                    </Tabs>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                <ImageModal
                    images={project.images}
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    currentIndex={currentImageIndex}
                    onIndexChange={setCurrentImageIndex}
                />
            </main>
        </div>
    );
}
