'use client'
import { Building2, Hammer, HardHat, Truck, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import { BASE_URL } from '@/const';

interface Service {
    id: number | string;
    title: string;
    description: string;
    icon: keyof typeof LucideIcons;
    borderColor?: string;
    textColor?: string;
    hoverBg?: string;
}

const iconComponents = Object.entries(LucideIcons)
    .filter(([key, value]) => typeof value === 'object' && value !== null && 'render' in value)
    .reduce((acc, [key, value]) => {
        acc[key as keyof typeof LucideIcons] = value as LucideIcons.LucideIcon;
        return acc;
    }, {} as Record<keyof typeof LucideIcons, LucideIcons.LucideIcon>);

export default function ServicePreview() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${BASE_URL}/services`);
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }
                const result = await response.json();
                const fetchedServices = Array.isArray(result) ? result : result.data;

                if (!Array.isArray(fetchedServices)){
                    throw new Error("Invalid data format received from API");
                }
                setServices(fetchedServices);
            } catch (err) {
                console.error("Failed to fetch services:", err);
                setError(err instanceof Error ? err.message : "Unknown error fetching services");
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById("service-section");
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    setIsVisible(true);
                }
            } else {
                 // console.warn("Service section not found for scroll effect");
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="service-section" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold text-center text-gray-800 mb-12 uppercase tracking-wide"
                    initial={{ opacity: 0, y: -20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 1 }}
                >
                    UNSER SERVICE
                </motion.h2>

                {loading && (
                    <div className="flex justify-center items-center py-10">
                        <Loader2 className="h-8 w-8 text-brand-yellow animate-spin" />
                        <span className="ml-3 text-gray-600">Dienste werden geladen...</span>
                    </div>
                )}

                {error && !loading && (
                    <div className="flex justify-center items-center py-10 text-red-600 bg-red-50 p-4 rounded-md">
                        <AlertCircle className="h-6 w-6 mr-2" />
                        <span>Fehler beim Laden der Dienste: {error}</span>
                    </div>
                )}

                {!loading && !error && services.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-x-16">
                        {services.map((service, index) => {
                            const IconComponent = iconComponents[service.icon] || LucideIcons.Box;
                            const borderColor = service.borderColor || "border-yellow-500";
                            const textColor = service.textColor || "text-black";
                            const hoverBg = service.hoverBg || "hover:bg-yellow-500 hover:text-white";

                            return (
                                <motion.div
                                    key={service.id}
                                    className={`flex flex-col items-center justify-center border-2 ${borderColor} rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${textColor} ${hoverBg}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    whileHover={{ scale: 1.05, rotate: 1 }}
                                >
                                    <motion.div
                                        className="flex items-center justify-center w-16 h-16 mb-4 rounded-lg bg-gray-100"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <IconComponent className="h-8 w-8 text-gray-700"/>
                                    </motion.div>
                                    <h3 className="mt-2 text-xl text-center font-semibold">
                                        {service.title}
                                    </h3>
                                    <p className="text-center mt-2 text-sm">
                                        {service.description.slice(0, 100)}...
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {!loading && !error && services.length === 0 && (
                     <div className="text-center py-10 text-gray-500">
                         Keine Dienste verfügbar.
                     </div>
                 )}
            </div>
        </section>
    );
}
