import { Phone, Mail, MapPin } from "lucide-react"

export function ContactInfo() {
  return (
      <div className="space-y-8 max-w-2xl w-full  mx-auto p-4 md:p-6 lg:p-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Hauptsitz</h2>
          <p>
            Frankfurter Straße 720-726 <br />
            51145 Köln, Nordrhein-Westfalen <br /><br />
            <strong>info@mos-projekt-plan.de</strong> <br />
            Tel.: +49 (0) 172 35 33 246
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Stellenanzeigen</h2>
          <p>
            Wenn Sie sich auf eine Stelle im Bereich Bauwesen bewerben möchten, senden Sie bitte einen Lebenslauf mit Kontaktinformationen an: <br />
            <strong>info@mos-projekt-plan.de</strong>
          </p>
        </div>


      </div>
  )
}