'use client'
import { Building2, Hammer, HardHat, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const services = [
    {
        title: "Hochbau",
        description: "Professionelle Planung und Ausführung von Gebäuden aller Art",
        icon: Building2,
        borderColor: "border-yellow-500",
        textColor: "text-black",
        hoverBg: "hover:bg-yellow-500 hover:text-white",
    },
    {
        title: "Tiefbau",
        description: "Infrastrukturprojekte und Grundlagenarbeiten",
        icon: HardHat,
        borderColor: "border-yellow-500",
        textColor: "text-black",
        hoverBg: "hover:bg-yellow-500 hover:text-white",
    },
    {
        title: "Renovierung",
        description: "Modernisierung und Sanierung bestehender Gebäude",
        icon: Hammer,
        borderColor: "border-yellow-500",
        textColor: "text-black",
        hoverBg: "hover:bg-yellow-500 hover:text-white",
    },
    {
        title: "Transport",
        description: "Zuverlässiger Transport von Baumaterialien",
        icon: Truck,
        borderColor: "border-yellow-500",
        textColor: "text-black",
        hoverBg: "hover:bg-yellow-500 hover:text-white",
    },
];

export default function ServicePreview() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById("service-section");
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.75) {
                    setIsVisible(true);
                }
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
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                >
                    Unsere Leistungen
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col items-center justify-center border-2 ${service.borderColor} rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${service.textColor} ${service.hoverBg}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ scale: 1.1, rotate: 2 }}
                        >
                            <motion.div
                                className="flex items-center justify-center w-20 h-20 rounded-lg bg-gray-100"
                                initial={{ rotate: 0 }}
                                whileHover={{ rotate: 15, scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <service.icon className="h-12 w-12 text-gray-700"/>
                            </motion.div>
                            <motion.h3
                                className="mt-4 text-xl font-semibold"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                {service.title}
                            </motion.h3>
                            <motion.p
                                className="text-center mt-2"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                {service.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
