import {Hero} from "@/components/hero"
import {ProjectPreview} from "@/components/project-preview"
import {ContactCTA} from "@/components/contact-cta"
import {Testimonials} from "@/components/testimonials"
import ServicePreview from "@/components/FeatureCards";
import {BASE_URL} from "@/const";

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

async function fetchSliderData() {
    const timestamp = new Date().getTime(); // Cache önlemek için timestamp ekle
    const response = await fetch(`${BASE_URL}/slider-images?_t=${timestamp}`, {
        next: {revalidate: 60} // Sayfa her istek yapıldığında yeniden doğrula
    });

    if (!response.ok) {
        throw new Error('Slider verileri alınamadı');
    }

    return response.json();
}

export default async function Home() {
    const {data: sliderData} = await fetchSliderData();

    console.log(sliderData)
    return (
        <div className="space-y-20 pb-20">
            <Hero sliderData={sliderData}/>

            {/*<Stats/>*/}
            <ServicePreview/>
            {/*<ServicePreview/>*/}
            <ProjectPreview/>
            {/*<Testimonials/>*/}
            {/*<Partners/>*/}
            <ContactCTA/>
            {/*<GoogleTranslateDropdown/>*/}
            {/*<LanguageSwitcher/>*/}

        </div>
    )
}


