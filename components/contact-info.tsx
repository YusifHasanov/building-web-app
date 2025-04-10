import { Phone, Mail, MapPin, Clock, Briefcase } from "lucide-react"
import { motion } from "framer-motion"

export function ContactInfo() {
    const contactItems = [
        {
            icon: <MapPin className="w-6 h-6 text-yellow-500" />,
            title: "Adresse",
            content: (
                <p className="text-gray-600">
                    Burgstraße 3<br />
                    50321 Brühl<br />
                    Deutschland
                </p>
            )
        },
        {
            icon: <Mail className="w-6 h-6 text-yellow-500" />,
            title: "E-Mail",
            content: (
                <a
                    href="mailto:info@bakubau.de"
                    className="text-gray-600 hover:text-yellow-600 hover:underline transition-colors"
                >
                    info@bakubau.de
                </a>
            )
        },
        {
            icon: <Phone className="w-6 h-6 text-yellow-500" />,
            title: "Telefon",
            content: (
                <a
                    href="tel:+4915213007777"
                    className="text-gray-600 hover:text-yellow-600 hover:underline transition-colors"
                >
                    +49 1521 300 7777
                </a>
            )
        },
        {
            icon: <Clock className="w-6 h-6 text-yellow-500" />,
            title: "Öffnungszeiten",
            content: (
                <p className="text-gray-600">
                    Mo - Fr: 8:00 - 17:00 Uhr<br />
                    Sa: Nach Vereinbarung<br />
                    So: Geschlossen
                </p>
            )
        }
    ]

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Kontaktinformationen</h2>

                <div className="space-y-6">
                    {contactItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex items-start gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div className="rounded-full bg-yellow-100 p-3 flex-shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-medium text-lg text-gray-800 mb-1">{item.title}</h3>
                                {item.content}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-yellow-500" />
                    Karriere bei Baku Bau
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <p className="text-gray-700 mb-4">
                        Sind Sie auf der Suche nach einer neuen beruflichen Herausforderung im Bauwesen?
                        Wir sind immer auf der Suche nach talentierten Fachkräften, die unser Team verstärken.
                    </p>
                    <p className="text-gray-700 mb-4">
                        Senden Sie Ihren Lebenslauf mit Kontaktinformationen an:
                    </p>
                    <motion.a
                        href="mailto:karriere@bakubau.de"
                        className="inline-flex items-center gap-2 text-yellow-600 font-medium hover:text-yellow-700 hover:underline transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Mail className="w-5 h-5" />
                        karriere@bakubau.de
                    </motion.a>
                </div>
            </div>
        </div>
    )
}
