"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/const";

interface AboutData {
    id: number;
    title: string;
    introduction: string;
    mission_title: string;
    mission_content: string;
    image_path: string;
    button_text: string;
    button_link: string;
    created_at: string;
    updated_at: string;
}

const defaultData: AboutData = {
    id: 0,
    title: "Über Uns - Baku Bau GmbH",
    introduction: "Die Baku Bau GmbH ist Ihr modernes Hoch-Bauunternehmen mit langjähriger Erfahrung in Köln und Umgebung. Wir kümmern uns um alle Aspekte Ihres Neubau- oder Umbauvorhabens, einschließlich umfassender Sanierungsprojekte.",
    mission_title: "Unsere Mission",
    mission_content: "Von der Immobilienentwicklung über die finanzielle Planung inklusive Förderungsberatung bis hin zur schlüsselfertigen Ausführung – wir stehen Ihnen zur Seite. Ob Einfamilienhaus, Mehrfamilienhäuser oder Großbau-Projekte, Sie können auf unser Wort zählen.",
    image_path: "/trans2.png",
    button_text: "Mehr Erfahren",
    button_link: "/kontakt",
    created_at: "",
    updated_at: ""
};

export default function AboutContent() {
    const [aboutData, setAboutData] = useState<AboutData>(defaultData);
    const [loading, setLoading] = useState(true);

    // Determine full image URL (prefix BASE_URL if needed)
    const rawImagePath = aboutData?.image_path ?? "";
    const imageUrl = rawImagePath.startsWith("http") || rawImagePath.startsWith("/")
        ? rawImagePath
        : `${BASE_URL}/${rawImagePath}`;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${BASE_URL}/about-page`);
                const data = await response.json();
                console.log(data);
                setAboutData(data);
            } catch (error) {
                console.error("Error fetching about page data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="pt-20 pb-20 flex justify-center items-center">
                <p className="text-lg">Lädt...</p>
            </div>
        );
    }

    return (
        <div className="pt-20 pb-20">
            {/* === Einführungssektion === */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brand-black leading-tight">
                    {aboutData.title?.split(' - ')[0] || "Über Uns"}
                </h1>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto">
                    {aboutData.introduction}
                </p>
            </section>

            {/* === Mission & Bild Sektion === */}
            <section className="bg-slate-50 py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Bild-Spalte */}
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                            <Image
                                src={imageUrl}
                                alt="Team oder Projekt der Baku Bau GmbH"
                                width={500}
                                height={400}
                                className="rounded-lg shadow-lg object-cover"
                            />
                        </div>

                        {/* Text-Spalte */}
                        <div className="w-full lg:w-1/2 text-left">
                            <h2 className="text-3xl font-semibold text-brand-black mb-5">
                                {aboutData.mission_title}
                            </h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-8">
                                {aboutData.mission_content}
                            </p>
                            <Button
                                size="lg"
                                className="mt-4 bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 transition-colors duration-200"
                                onClick={() => window.location.href = aboutData.button_link}
                            >
                                {aboutData.button_text}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
