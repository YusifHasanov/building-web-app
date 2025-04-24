// resources/js/Components/ProcessSection.tsx
import { BASE_URL } from "@/const";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Define Project interfaces based on API response
interface ProjectCategory {
  id: number;
  value: string;
  label: string;
}

interface ProjectImage {
  id: number;
  category_value: string;
  src: string;
  alt: string | null;
  title: string | null;
  sort_order: number;
}

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  content: string | null;
  thumbnail: string;
  status: string;
  created_at: string;
  updated_at: string;
  categories: ProjectCategory[];
  images: ProjectImage[];
}

// Renamed function for clarity, but kept export name for compatibility
export async function ProcessSection() {
  // Fetch projects instead of steps
  let projects: Project[] = [];

  try {
    // Fetch from projects endpoint
    const response = await fetch(`${BASE_URL}/projects`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`API yanıt vermedi: ${response.status}`);
    }

    const result = await response.json();
    // Expect { data: [...] } structure
    if (result && Array.isArray(result.data)) {
        projects = result.data;
    } else {
        console.warn("API'den beklenen proje verisi formatı alınamadı.");
    }

  } catch (error) {
    // Update error message
    console.error('Projeler yüklenirken hata oluştu:',
        error instanceof Error ? error.message : String(error));
  }

  // Update section structure and content to display projects
  return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">Öne Çıkan Projelerimiz</h2>
            <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Başarıyla tamamladığımız bazı projelere göz atın.
            </p>
          </div>

          {projects.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-lg">Projeler yükleniyor veya mevcut değil...</p>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <Link href={`/projects/${project.slug}`} key={project.id} className="block group">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl h-full flex flex-col">
                            <div className="relative w-full h-48">
                                <Image
                                    src={project.thumbnail || "/placeholder.svg"}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-yellow transition-colors">{project.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
                                <div className="mt-auto pt-2 border-t border-gray-100">
                                    <span className="text-brand-yellow font-medium text-sm flex items-center group-hover:underline">
                                        Detayları Gör
                                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
              </div>
          )}
        </div>
      </section>
  );
}
