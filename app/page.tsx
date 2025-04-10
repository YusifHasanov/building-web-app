import {Hero} from "@/components/hero"
import {ProjectPreview} from "@/components/project-preview"
import {ContactCTA} from "@/components/contact-cta"
import {Testimonials} from "@/components/testimonials"
import ServicePreview from "@/components/FeatureCards";
import {BASE_URL} from "@/const";

async function fetchSliderData() {
    const timestamp = new Date().getTime(); // Cache önlemek için timestamp ekle
    const response = await fetch(`${BASE_URL}/slider-images?_t=${timestamp}`, {
        cache: 'no-store', // Next.js önbelleğini devre dışı bırak
        next: {revalidate: 0} // Sayfa her istek yapıldığında yeniden doğrula
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


