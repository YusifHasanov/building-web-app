import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"

export const metadata = {
  title: "Kontakt - Baku Bau GmbH",
  description: "Kontaktieren Sie Baku Bau GmbH für Ihre Bauprojekte.",
}

export default function ContactPage() {
  return (
    <div className="space-y-20 pb-20">
      <ContactHero />
      <div className="container grid lg:grid-cols-2 gap-12">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  )
}

