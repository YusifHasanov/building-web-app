import {Hero} from "@/components/hero"
import {ProjectPreview} from "@/components/project-preview"
import {ContactCTA} from "@/components/contact-cta"
import {Testimonials} from "@/components/testimonials"
import {Stats} from "@/components/stats"
import {Partners} from "@/components/partners"
import ServicePreview from "@/components/FeatureCards";

import {LanguageSwitcher} from "@/components/language-switcher";


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


