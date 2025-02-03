import Image from "next/image"

const partners = [
  { name: "TechCorp GmbH", logo: "https://1000logos.net/wp-content/uploads/2018/04/mercedes-logo-sm.png" },
  { name: "CityDev AG", logo: "https://1000logos.net/wp-content/uploads/2016/10/Adidas-Logo-tumb.png" },
  { name: "DesignBuild GmbH", logo: "https://1000logos.net/wp-content/uploads/2019/06/Real-Madrid-Logo.jpg" },
  { name: "InfraTech Solutions", logo: "https://1000logos.net/wp-content/uploads/2016/12/Starbucks-logo-tumb.jpg" },
  { name: "EcoConstruct KG", logo: "https://1000logos.net/wp-content/uploads/2018/05/Gmail-logo-tumb.jpg" },
  { name: "ModernBau AG", logo: "https://1000logos.net/wp-content/uploads/2018/04/mercedes-logo-sm.png" },
]

export function Partners() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Unsere Partner</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <div key={partner.name} className="flex hover:cursor-pointer justify-center">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={250}
                height={150}
                className="max-h-20 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

