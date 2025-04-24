import {Hero} from "@/components/hero"
import {ProjectPreview} from "@/components/project-preview"
import {ContactCTA} from "@/components/contact-cta"
import {Testimonials} from "@/components/testimonials"
import ServicePreview from "@/components/FeatureCards";
import {BASE_URL} from "@/const";
import HomeContent from "@/components/HomeContent";

// Add specific metadata for the homepage
export const metadata = {
    title: "Baku Bau GmbH - Startseite | Bauunternehmen in Brühl", // Specific title
    description: "Baku Bau GmbH: Ihr Experte für Hochbau, Sanierung und Modernisierung in Brühl. Entdecken Sie unsere Projekte und kontaktieren Sie uns für Ihr Bauvorhaben.", // Specific description
    // Optional: Add homepage specific keywords
    // keywords: ["Bauunternehmen Brühl", "Baku Bau", "Startseite", "Hochbau", "Sanierung"],
    // Inherits openGraph and twitter from layout, but can override if needed
    // openGraph: { ... override specific fields ... },
    // twitter: { ... override specific fields ... },
};

export default function Page() {
    return <HomeContent />;
}


