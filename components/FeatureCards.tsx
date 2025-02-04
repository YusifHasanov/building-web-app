import { Building2, Hammer, HardHat, Truck } from "lucide-react";

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
        borderColor: "border-gray-800",
        textColor: "text-black",
        hoverBg: "hover:bg-gray-800 hover:text-white",
    },
    {
        title: "Transport",
        description: "Zuverlässiger Transport von Baumaterialien",
        icon: Truck,
        borderColor: "border-gray-800",
        textColor: "text-black",
        hoverBg: "hover:bg-gray-800 hover:text-white",
    },
];

export default function ServicePreview() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 uppercase tracking-wide">
                    Unsere Leistungen
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center border-2 ${service.borderColor} rounded-xl shadow-lg p-6 transition-all duration-300  hover:shadow-xl ${service.textColor} ${service.hoverBg}`}
                        >
                            <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-gray-100">
                                <service.icon className="h-12 w-12 text-gray-700"/>
                            </div>
                            <h3 className="mt-4 text-xl font-semibold ">{service.title}</h3>
                            <p className=" text-center mt-2">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}