"use client";

import React, { useState, useEffect } from "react";
import { Hero } from "@/components/hero";
import { ProjectPreview } from "@/components/project-preview";
import { ContactCTA } from "@/components/contact-cta";
import ServicePreview from "@/components/FeatureCards";
import { BASE_URL } from "@/const";

export default function HomeContent() {
  const [sliderData, setSliderData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSlider() {
      try {
        const timestamp = new Date().getTime();
        const response = await fetch(`${BASE_URL}/slider-images?_t=${timestamp}`, {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Slider data fetch failed");
        const data = await response.json();
        // API might return { data: [...] }
        setSliderData((data as any).data ?? data);
      } catch (error) {
        console.error("Error loading slider data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSlider();
  }, []);

  if (loading) {
    return (
      <div className="pt-20 pb-20 flex justify-center items-center">
        <p className="text-lg">Slider wird geladen...</p>
      </div>
    );
  }

  return (
    <div className="space-y-20 pb-20">
      <Hero sliderData={sliderData} />
      <ServicePreview />
      <ProjectPreview />
      <ContactCTA />
    </div>
  );
} 