import {Hero} from "@/components/hero"
import {ServicePreview} from "@/components/service-preview"
import {ProjectPreview} from "@/components/project-preview"
import {ContactCTA} from "@/components/contact-cta"
import {Testimonials} from "@/components/testimonials"
import {Stats} from "@/components/stats"
import {Partners} from "@/components/partners"
import FeatureCards from "@/components/FeatureCards";

export default function Home() {
    return (
        <div className="space-y-20 pb-20">
            <Hero/>
            <Stats/>
            <FeatureCards/>
            {/*<ServicePreview/>*/}
            <ProjectPreview/>
            <Testimonials/>
            <Partners/>
            <ContactCTA/>
        </div>
    )
}


