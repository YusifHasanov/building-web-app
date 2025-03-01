import { Phone, Mail, MapPin } from "lucide-react"

export function ContactInfo() {
    return (
        <div className="space-y-8 max-w-2xl w-full mx-auto p-4 md:p-6 lg:p-8">
            <div>
                <h2 className="text-2xl font-bold mb-6">Hauptsitz</h2>
                <p>
                    50321 Bruhl<br />
                    Burg straße 3<br /><br />
                    <strong>
                        <a href="info@bakubau.de" className="text-blue-500 hover:underline flex items-center gap-2">
                            <Mail className="w-5 h-5" /> info@bakubau.de
                        </a>
                    </strong>
                    <br />
                    <a href="tel:+4915213007777" className="text-blue-500 hover:underline flex items-center gap-2 mt-2">
                        <Phone className="w-5 h-5" /> +49 1521 3007777
                    </a>
                    {/*<a href="tel:+4915755462991" className="text-blue-500 hover:underline flex items-center gap-2 mt-2">*/}
                    {/*    <Phone className="w-5 h-5" /> +49 1575 5462991*/}
                    {/*</a>*/}
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-6">Stellenanzeigen</h2>
                <p>
                    Wenn Sie sich auf eine Stelle im Bereich Bauwesen bewerben möchten, senden Sie bitte einen Lebenslauf mit Kontaktinformationen an: <br />
                    <strong>
                        <a href="mailto:info@bakubau.de" className="text-blue-500 hover:underline flex items-center gap-2">
                            <Mail className="w-5 h-5" /> info@bakubau.de
                        </a>
                    </strong>
                </p>
            </div>
        </div>
    )
}