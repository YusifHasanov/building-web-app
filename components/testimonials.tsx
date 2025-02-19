'use client'
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
        "Baku Bau hat unser Projekt mit höchster Professionalität und Qualität umgesetzt. Wir sind begeistert vom Ergebnis!",
    author: "Maria Schmidt",
    position: "CEO, TechCorp GmbH",
    image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    quote:
        "Die Zusammenarbeit mit Baku Bau war hervorragend. Termintreue und Budgeteinhaltung waren vorbildlich.",
    author: "Thomas Müller",
    position: "Projektmanager, CityDev AG",
    image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    quote:
        "Innovative Lösungen und erstklassige Handwerkskunst zeichnen Baku Bau aus. Absolut empfehlenswert!",
    author: "Laura Weber",
    position: "Architektin, DesignBuild GmbH",
    image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("testimonials-section");
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
      <section id="testimonials-section" className="py-20 bg-gray-50">
        <motion.div
            className="container mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
        >
          <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
          >
            Was unsere Kunden sagen
          </motion.h2>

          {/*
          Önemli kısım: items-stretch -> her sütun aynı yükseklikte uzar
        */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {testimonials.map((testimonial, index) => (
                <motion.div
                    key={index}
                    className="flex" // Her bir kutu içinde flex kullanıyoruz
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                >
                  {/*
                flex-grow ve h-full -> Tüm boşluğu kaplamasını sağlar,
                böylece yükseklik eşitlenir.
              */}
                  <Card className="bg-white flex-grow">
                    <CardContent className="p-6 h-full flex flex-col justify-between">
                      <p
                          className="text-gray-600 italic mb-4"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                      >
                        "{testimonial.quote}"
                      </p>

                      <div className="flex items-center">
                        <motion.div
                            initial={{ rotate: 0 }}
                            whileHover={{ rotate: 5 }}
                            transition={{ duration: 0.3 }}
                        >
                          <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.author}
                              width={50}
                              height={50}
                              className="rounded-full mr-4"
                          />
                        </motion.div>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-gray-500">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
  );
}