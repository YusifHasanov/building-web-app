import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Kontaktinformationen</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <Phone className="h-6 w-6 text-brand-yellow mr-4 mt-1" />
            <div>
              <h3 className="font-medium">Telefon</h3>
              <p className="text-gray-600">+49 123 456789</p>
            </div>
          </div>
          <div className="flex items-start">
            <Mail className="h-6 w-6 text-brand-yellow mr-4 mt-1" />
            <div>
              <h3 className="font-medium">E-Mail</h3>
              <p className="text-gray-600">info@bakubau.de</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="h-6 w-6 text-brand-yellow mr-4 mt-1" />
            <div>
              <h3 className="font-medium">Adresse</h3>
              <p className="text-gray-600">
                Musterstraße 123
                <br />
                12345 Berlin
                <br />
                Deutschland
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="h-6 w-6 text-brand-yellow mr-4 mt-1" />
            <div>
              <h3 className="font-medium">Öffnungszeiten</h3>
              <p className="text-gray-600">
                Mo - Fr: 8:00 - 17:00 Uhr
                <br />
                Sa - So: Geschlossen
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Anfahrt</h2>
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.409456942976!2d13.404954!3d52.520007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDMxJzEyLjAiTiAxM8KwMjQnMTcuOCJF!5e0!3m2!1sen!2sde!4v1635959106564!5m2!1sen!2sde"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}

