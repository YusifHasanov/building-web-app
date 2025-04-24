import Image from "next/image";
import { Button } from "@/components/ui/button";
import {BASE_URL} from "@/const";
import AboutContent from "@/components/AboutContent";

// Export metadata as a function to make it dynamic
export async function generateMetadata() {
    // Fetch data from API
    // const res = await fetch(`${BASE_URL}/about-page`);
    // const aboutPage = await res.json();

    return {
        title: "Über Uns - Baku Bau GmbH",
        description: "Erfahren Sie mehr über Baku Bau GmbH, unsere Geschichte und unser Team.",
    };
}

export default function AboutPage() {
    return <AboutContent />;
}
