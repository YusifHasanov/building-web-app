import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2, Hammer, HardHat, Truck } from "lucide-react"

const services = [
  {
    title: "Hochbau",
    description: "Professionelle Planung und Ausführung von Gebäuden aller Art",
    icon: Building2,
  },
  {
    title: "Tiefbau",
    description: "Infrastrukturprojekte und Grundlagenarbeiten",
    icon: HardHat,
  },
  {
    title: "Renovierung",
    description: "Modernisierung und Sanierung bestehender Gebäude",
    icon: Hammer,
  },
  {
    title: "Transport",
    description: "Zuverlässiger Transport von Baumaterialien",
    icon: Truck,
  },
]

export function ServicePreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Unsere Leistungen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white hover:cursor-pointer p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <service.icon className="h-12 w-12  mb-4" />
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/services">Alle Leistungen ansehen</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}




// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Building2, Hammer, HardHat, Truck } from "lucide-react";
//
// const services = [
//   {
//     title: "Hochbau",
//     description: "Professionelle Planung und Ausführung von Gebäuden aller Art",
//     icon: Building2,
//   },
//   {
//     title: "Tiefbau",
//     description: "Infrastrukturprojekte und Grundlagenarbeiten",
//     icon: HardHat,
//   },
//   {
//     title: "Renovierung",
//     description: "Modernisierung und Sanierung bestehender Gebäude",
//     icon: Hammer,
//   },
//   {
//     title: "Transport",
//     description: "Zuverlässiger Transport von Baumaterialien",
//     icon: Truck,
//   },
// ];
//
// export function ServicePreview() {
//   return (
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 uppercase tracking-wide">
//             Unsere Leistungen
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {services.map((service) => (
//                 <div
//                     key={service.title}
//                     className="flex items-center justify-center bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
//                 >
//                   <div className="flex flex-col items-center">
//                     <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-gray-100">
//                       <service.icon className="h-12 w-12 text-gray-700" />
//                     </div>
//                     <h3 className="mt-4 text-xl font-semibold text-gray-900">{service.title}</h3>
//                   </div>
//                 </div>
//             ))}
//           </div>
//           <div className="text-center mt-12">
//             <Button asChild>
//               <Link href="/services">Alle Leistungen ansehen</Link>
//             </Button>
//           </div>
//         </div>
//       </section>
//   );
// }