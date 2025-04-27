"use client";

// resources/js/Components/ProcessSection.tsx
import React, { useState, useEffect } from "react";
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

// Convert to client component with hooks
export function ProcessSection() {
    const [steps, setSteps] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSteps() {
            try {
                // Fetch from projects endpoint
                const response = await fetch(`${BASE_URL}/process-steps`);

                if (!response.ok) {
                    throw new Error(`API yanıt vermedi: ${response.status}`);
                }

                const result = await response.json();
                // Expect { data: [...] } structure
                if (result && Array.isArray(result)) {
                    setSteps(result);
                } else {
                    console.warn("API'den beklenen proje verisi formatı alınamadı.");
                    setSteps([]);
                }
            } catch (error) {
                // Update error message
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.error('Projeler yüklenirken hata oluştu:', errorMessage);
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        }

        fetchSteps();
    }, []);

    // Update section structure and content to display projects
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-bold mb-4">Unser Arbeitsprozess</h2>
                    <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Wir arbeiten strukturiert und transparent, um Ihr Projekt erfolgreich umzusetzen.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-500 text-lg">Projeler yükleniyor...</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-red-500 text-lg">Hata: {error}</p>
                    </div>
                ) : steps.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-500 text-lg">Projeler mevcut değil</p>
                    </div>
                ) : (
                    <div className="max-w-5xl mx-auto relative">
                        {/* Vertical line for the timeline */}
                        <div
                            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-brand-yellow/20 rounded-full"></div>

                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`flex mb-16 items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                {/* Timeline dot */}
                                <div
                                    className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-brand-yellow z-10"></div>

                                {/* Content */}
                                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                                    <div
                                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-brand-yellow"
                                    >
                                        <span
                                            className="bg-brand-yellow text-white text-sm font-bold py-1 px-3 rounded-full mb-4 inline-block">
                                          Schritt {index + 1}
                                        </span>
                                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>

                                <div className="w-2/12"></div>
                                {/* Spacer for the timeline */}

                                <div className="w-5/12"></div>
                                {/* Space for the other side */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
