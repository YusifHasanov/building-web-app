// resources/js/Components/ServicesList.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Hammer, HardHat, Truck, Shield, CheckCircle } from "lucide-react";
import { RouteIcon as Road } from "lucide-react";
import { BASE_URL } from "@/const";

// Service tipini tanımlama
interface Feature {
    item?: string;
}

interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    features: Array<Feature>;
    is_active: boolean;
    sort: number;
    created_at: string;
    updated_at: string;
}

// İkon bileşenlerinin map'i
const iconComponents: Record<string, React.ComponentType<any>> = {
    Building2: Building2,
    HardHat: HardHat,
    Hammer: Hammer,
    Road: Road,
    Truck: Truck,
    Shield: Shield
};

export async function ServicesList() {
    // Next.js server component'inde veri çekme
    let services: Service[] = [];

    try {
        const response = await fetch(`${BASE_URL}/services`, {
            cache: 'no-store',
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            throw new Error(`API yanıt vermedi: ${response.status}`);
        }

        services = await response.json();
    } catch (error) {
        console.error('Hizmetler yüklenirken hata oluştu:', error instanceof Error ? error.message : String(error));
    }

    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-bold mb-4">Unsere Dienstleistungen</h2>
                    <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Wir bieten professionelle Baulösungen für jedes Projekt, vom kleinen Umbau bis zum großen Bauprojekt.
                    </p>
                </div>

                {services.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="flex flex-col items-center p-8 rounded-lg bg-gray-50">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mb-4"></div>
                            <p className="text-gray-600">Daten werden geladen...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => {
                            const IconComponent = iconComponents[service.icon];

                            return (
                                <Card
                                    key={service.id}
                                    className="group overflow-hidden transition-all duration-300 hover:shadow-xl border-transparent hover:border-brand-yellow/30 hover:-translate-y-1"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/10 rounded-bl-full transform transition-transform group-hover:scale-125"></div>

                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div className="rounded-lg p-4 bg-brand-yellow/10 mb-4">
                                                {IconComponent && <IconComponent className="h-8 w-8 text-brand-yellow" />}
                                            </div>
                                        </div>
                                        <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                                        <CardDescription className="text-base">{service.description}</CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <ul className="space-y-3 mt-2">
                                            {service.features.map((feature, index) => (
                                                <li key={index} className="flex items-center text-sm text-gray-700">
                                                    <CheckCircle className="h-5 w-5 text-brand-yellow mr-3 flex-shrink-0" />
                                                    <span>{feature.item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-6 pt-4 border-t border-gray-100">
                                            <button className="text-brand-yellow font-medium flex items-center group-hover:underline">
                                                Mehr erfahren
                                                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
