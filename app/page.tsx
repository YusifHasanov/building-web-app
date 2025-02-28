import {Hero} from "@/components/hero"
import {ProjectPreview} from "@/components/project-preview"
import {ContactCTA} from "@/components/contact-cta"
import {Testimonials} from "@/components/testimonials"
import ServicePreview from "@/components/FeatureCards";



export default function Home() {
    return (
        <div className="space-y-20 pb-20">
            <Hero/>

            {/*<Stats/>*/}
            <ServicePreview/>
            {/*<ServicePreview/>*/}
            <ProjectPreview/>
            <Testimonials/>
            {/*<Partners/>*/}
            <ContactCTA/>
            {/*<GoogleTranslateDropdown/>*/}
            {/*<LanguageSwitcher/>*/}

        </div>
    )
}


