'use client'
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Hammer, HardHat, Truck } from "lucide-react";

const services = [
    {
        title: "Hochbau",
        description: "Professionelle Planung und Ausführung von Gebäuden aller Art",
        icon: Building2,
        link: "/services/hochbau",
    },
    {
        title: "Tiefbau",
        description: "Infrastrukturprojekte und Grundlagenarbeiten",
        icon: HardHat,
        link: "/services/tiefbau",
    },
    {
        title: "Renovierung",
        description: "Modernisierung und Sanierung bestehender Gebäude",
        icon: Hammer,
        link: "/services/renovierung",
    },
    {
        title: "Transport",
        description: "Zuverlässiger Transport von Baumaterialien",
        icon: Truck,
        link: "/services/transport",
    },
];

export function ServiceProviderPreview() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 uppercase tracking-wide">
                    Unsere Leistungen
                </h2>
                <HoverEffect
                    items={services.map((service) => ({
                        title: service.title,
                        description: service.description,
                        link: service.link,
                        icon: service.icon,
                    }))}
                />
                <div className="text-center mt-12">
                    <Button asChild>
                        <Link href="/services">Alle Leistungen ansehen</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export const HoverEffect = ({
                                items,
                                className,
                            }: {
    items: {
        title: string;
        description: string;
        link: string;
        icon: any;
    }[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
            {items.map((item, idx) => (
                <Link
                    href={item.link}
                    key={item.link}
                    className="relative group block p-4 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-[#f9fdff] block rounded-xl shadow-md"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    transition: { duration: 0.3, ease: "easeInOut" },
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.95,
                                    transition: { duration: 0.3, ease: "easeInOut" },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card>
                        <item.icon className="h-12 w-12 text-gray-700 mb-4" />
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    return (
        <div
            className={cn(
                "rounded-xl h-full w-full p-6 bg-white border border-gray-200 shadow-sm group-hover:shadow-lg transition-all duration-300 ease-in-out transform group-hover:scale-105",
                className
            )}
        >
            <div className="relative">
                <div className="p-4 flex flex-col items-center">{children}</div>
            </div>
        </div>
    );
};

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    return <h4 className={cn("text-gray-900 font-semibold tracking-wide text-lg text-center", className)}>{children}</h4>;
};

export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    return <p className={cn("mt-2 text-gray-600 text-sm leading-relaxed text-center", className)}>{children}</p>;
};
