// resources/js/Components/ProjectGrid.tsx
import Image from "next/image"
import Link from "next/link"
import {ArrowUpRight, Calendar, MapPin, Loader2} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import {BASE_URL} from "@/const"

// Proje tipi tanımlaması
interface Project {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    thumbnail: string;
    year: string;
    slug: string;
}

// Durum renklerini tanımla
const statusColors: Record<string, string> = {
    "Abgeschlossen": "bg-green-100 text-green-800",
    "In Bearbeitung": "bg-blue-100 text-blue-800",
    "In Planung": "bg-amber-100 text-amber-800"
};

export async function ProjectGrid() {
    // Projeleri API'den çek
    let projects: Project[] = [];
    let categories: string[] = [];
    let isLoading = false;
    let error = null;

    try {
        isLoading = true;
        const response = await fetch(`${BASE_URL}/projects`, {
            cache: 'no-store',
            next: {revalidate: 60}
        });

        if (!response.ok) {
            throw new Error(`API yanıt vermedi: ${response.status}`);
        }

        projects = (await response.json()).data;

        // Kategorileri çıkar
        const categorySet = new Set<string>();
        projects.forEach(project => {
            if (project.category) {
                categorySet.add(project.category);
            }
        });
        categories = Array.from(categorySet);

    } catch (err) {
        error = err instanceof Error ? err.message : String(err);
        console.error('Projeler yüklenirken hata oluştu:', error);
    } finally {
        isLoading = false;
    }

    // Yükleme durumu
    if (isLoading) {
        return (
            <section className="py-24">
                <div className="container mx-auto px-4 flex flex-col items-center justify-center h-96">
                    <Loader2 className="h-12 w-12 text-brand-yellow animate-spin mb-4"/>
                    <p className="text-lg text-gray-600">Projeler yükleniyor...</p>
                </div>
            </section>
        );
    }

    // Hata durumu
    if (error) {
        return (
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-md">
                        <h3 className="text-red-800 font-bold text-xl mb-2">Veri yüklenirken bir hata oluştu</h3>
                        <p className="text-red-700">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    // Veri yoksa
    if (projects.length === 0) {
        return (
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Unsere Referenzprojekte</h2>
                        <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
                        <p className="text-gray-600">Aktuell sind keine Projekte verfügbar.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-bold mb-4">Unsere Referenzprojekte</h2>
                    <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Entdecken Sie unsere vielfältigen Bauprojekte, die wir erfolgreich umgesetzt haben.
                    </p>
                </div>

                {/* Kategoriler */}
                {categories.length > 0 && (
                    <div className="flex justify-center mb-10 flex-wrap gap-2">
                        <Badge variant="outline" className="px-4 py-2 text-base cursor-pointer hover:bg-gray-100">
                            Alle
                        </Badge>
                        {categories.map(category => (
                            <Badge
                                key={category}
                                variant="outline"
                                className="px-4 py-2 text-base cursor-pointer hover:bg-gray-100"
                            >
                                {category}
                            </Badge>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10">
                    {projects.map((project) => (
                        <Link href={`/projects/${project.slug}`} key={project.id} className="block h-full group">
                            <div
                                className="overflow-hidden h-full border-0 bg-transparent transition-transform duration-300 hover:-translate-y-2">
                                <div
                                    className="relative h-80 overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all">
                                    <div
                                        className={`absolute top-4 right-4 z-10 ${statusColors[project.status] || "bg-gray-100 text-gray-800"} px-3 py-1 rounded-full text-sm font-medium`}>
                                        {project.status}
                                    </div>

                                    <Image
                                        src={project.thumbnail || "/placeholder.svg"}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-all duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />

                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-xl font-bold mb-2 group-hover:underline decoration-brand-yellow decoration-2 underline-offset-4">
                                            {project.title}
                                        </h3>

                                        <div className="flex items-center text-sm opacity-90 mb-2">
                                            <MapPin className="w-4 h-4 mr-1"/>
                                            <span>{project.description}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-sm opacity-90">
                                                <Calendar className="w-4 h-4 mr-1"/>
                                                <span>{project.year}</span>
                                            </div>

                                            <Badge
                                                className="bg-brand-yellow text-white border-none">{project.category}</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="mt-4 flex items-center justify-end text-brand-yellow opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                                    <span className="font-medium mr-1">Projektdetails anzeigen</span>
                                    <ArrowUpRight className="w-4 h-4"/>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    )
}
