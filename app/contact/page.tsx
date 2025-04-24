'use client'
import {motion} from "framer-motion"
import {ContactForm} from "@/components/contact-form"
import {Briefcase, Clock, Mail, MapPin, Phone, Loader2} from "lucide-react";
import {useState, useEffect} from 'react';
import {BASE_URL} from '@/const';

// Define default values
const defaultContactInfo = {
    address: "Burgstraße 3\n50321 Brühl\nDeutschland",
    email: "info@bakubau.de",
    phone: "+49 1521 300 7777",
    openingHours: [
        {day: "Mo - Fr", hours: "8:00 - 17:00 Uhr"},
        {day: "Sa", hours: "Nach Vereinbarung"},
        {day: "So", hours: "Geschlossen"},
    ],
    careerEmail: "karriere@bakubau.de",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.058131071929!2d6.903346676694214!3d50.83008715995655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf22f2c163619f%3A0xd8308923d39ed3b2!2sBurgstra%C3%9Fe%203%2C%2050321%20Br%C3%BChl%2C%20Almanya!5e0!3m2!1str!2saz!4v1740742972457!5m2!1str!2saz" // Default map URL if needed
};

export default function ContactPage() {

    // State for contact info
    const [contactInfo, setContactInfo] = useState(defaultContactInfo);
    const [loadingInfo, setLoadingInfo] = useState(true);
    const [errorInfo, setErrorInfo] = useState<string | null>(null);

    // Fetch contact info on mount
    useEffect(() => {
        const fetchContactInfo = async () => {
            setLoadingInfo(true);
            setErrorInfo(null);
            try {
                const response = await fetch(`${BASE_URL}/contact-info`);
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }
                const data = await response.json();
                if (data.success && data.data) {
                    // Format opening hours if needed, API returns array of objects
                    // Assuming API data.data.opening_hours is [{day: string, hours: string}]
                    const formattedHours = data.data.opening_hours && Array.isArray(data.data.opening_hours)
                        ? data.data.opening_hours
                        : defaultContactInfo.openingHours; // Fallback if format is wrong

                    console.log(data)

                    setContactInfo({
                        address: data.data.address || defaultContactInfo.address,
                        email: data.data.email || defaultContactInfo.email,
                        phone: data.data.phone || defaultContactInfo.phone,
                        openingHours: formattedHours,
                        careerEmail: data.data.career_email || defaultContactInfo.careerEmail,
                        mapEmbedUrl: data.data.map_embed_url || defaultContactInfo.mapEmbedUrl
                    });
                } else {
                    // API returned success: false or data field missing, use defaults
                    console.warn("API request successful but data invalid or success:false. Using default contact info.");
                    setContactInfo(defaultContactInfo);
                }
            } catch (err) {
                console.error("Failed to fetch contact info:", err);
                setErrorInfo(err instanceof Error ? err.message : "Unknown error");
                setContactInfo(defaultContactInfo); // Use defaults on error
            } finally {
                setLoadingInfo(false);
            }
        };

        fetchContactInfo();
    }, []); // Empty dependency array means run once on mount

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src="/contsct.jpg"
                        alt="Baku Bau Construction"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="container relative z-10 px-6 text-center">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                    >
                        Kontaktieren Sie Uns
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.6, delay: 0.2}}
                    >
                        Wir sind für Sie da, um Ihr nächstes Bauprojekt zu verwirklichen.
                        Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
                    </motion.p>
                </div>
            </section>

            {/* Main Content - Desktop: Map on left, Content on right */}
            {/* Added 'relative' here for sticky positioning context if needed, though usually body works */}
            <div className="flex flex-col lg:flex-row relative">
                {/* Left Side - Full-height Sticky Map (Desktop) */}
                <motion.div
                    // Mobile height, Desktop width reduced (e.g., 1/3 or 2/5), Desktop full screen height, Sticky top
                    className="lg:w-1/3 xl:w-2/5 h-[50vh] sm:px-18 sm:py-16 p-8  lg:h-screen lg:sticky lg:top-10 order-2 lg:order-1" // Adjusted width and height
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.7}}
                >
                    {/* Ensure the map container and iframe fill the motion.div */}
                    <div className="w-full h-full rounded-md relative">
                        <iframe
                            src={contactInfo.mapEmbedUrl}
                            width="100%"
                            height="100%" // iframe fills its container
                            style={{border: 0}}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </motion.div>

                {/* Right Side - Content */}
                {/* Adjusted width to take remaining space */}
                <div className="lg:w-2/3 xl:w-3/5 py-16 px-6 md:px-10 lg:px-12 order-1 lg:order-2">
                    {/* Increased max-width slightly for wider content area */}
                    <div className="max-w-3xl mx-auto ">
                        {/* Anfahrt Section - Mobile only */}
                        <div className="lg:hidden sm:mb-0  mb-4">
                            <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Anfahrt</h2>
                            <div className="bg-white rounded-xl shadow-lg p-4">
                                <p className="text-gray-700 mb-2 font-medium">Burgstraße 3, 50321 Brühl, Almanya</p>
                                <a
                                    href={contactInfo.mapEmbedUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-yellow-600 hover:text-yellow-700 text-sm"
                                >
                                    In Google Maps öffnen
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl mb-16 pt-0 p-8 md:px-10" // Slightly more padding on md+
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.7, delay: 0.2}}
                        >
                            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Kontaktformular</h2>
                            <ContactForm/>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl p-8 md:px-10" // Slightly more padding on md+
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.7, delay: 0.3}}
                        >
                            <div className="space-y-10">
                                <div>
                                    <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Kontaktinformationen</h2>

                                    {loadingInfo && (
                                        <div className="flex justify-center items-center py-6">
                                            <Loader2 className="h-6 w-6 text-yellow-500 animate-spin mr-2" />
                                            <span>Lade Kontaktinformationen...</span>
                                        </div>
                                    )}
                                    {errorInfo && (
                                        <div className="text-red-600 bg-red-50 p-4 rounded-md">
                                            Fehler beim Laden der Kontaktinformationen. Standardwerte werden angezeigt.
                                        </div>
                                    )}
                                    {!loadingInfo && (
                                        <div className="space-y-6">
                                            {/* Address */}
                                            <motion.div
                                                className="flex items-start gap-4"
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{duration: 0.4, delay: 0.1}}
                                            >
                                                <div className="rounded-full bg-yellow-100 p-3 flex-shrink-0">
                                                    <MapPin className="w-6 h-6 text-yellow-500" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-lg text-gray-800 mb-1">Adresse</h3>
                                                    <p className="text-gray-600 whitespace-pre-line">{contactInfo.address}</p>
                                                </div>
                                            </motion.div>

                                            {/* Email */}
                                            <motion.div
                                                className="flex items-start gap-4"
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{duration: 0.4, delay: 0.2}}
                                            >
                                                <div className="rounded-full bg-yellow-100 p-3 flex-shrink-0">
                                                    <Mail className="w-6 h-6 text-yellow-500" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-lg text-gray-800 mb-1">E-Mail</h3>
                                                    <a
                                                        href={`mailto:${contactInfo.email}`}
                                                        className="text-gray-600 hover:text-yellow-600 hover:underline transition-colors"
                                                    >
                                                        {contactInfo.email}
                                                    </a>
                                                </div>
                                            </motion.div>

                                            {/* Phone */}
                                            <motion.div
                                                className="flex items-start gap-4"
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{duration: 0.4, delay: 0.3}}
                                            >
                                                <div className="rounded-full bg-yellow-100 p-3 flex-shrink-0">
                                                    <Phone className="w-6 h-6 text-yellow-500" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-lg text-gray-800 mb-1">Telefon</h3>
                                                    <a
                                                        href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                                                        className="text-gray-600 hover:text-yellow-600 hover:underline transition-colors"
                                                    >
                                                        {contactInfo.phone}
                                                    </a>
                                                </div>
                                            </motion.div>

                                            {/* Opening Hours */}
                                            <motion.div
                                                className="flex items-start gap-4"
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{duration: 0.4, delay: 0.4}}
                                            >
                                                <div className="rounded-full bg-yellow-100 p-3 flex-shrink-0">
                                                    <Clock className="w-6 h-6 text-yellow-500" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-lg text-gray-800 mb-1">Öffnungszeiten</h3>
                                                    <div className="text-gray-600">
                                                        {contactInfo.openingHours.map((item, index) => (
                                                            <div key={index}>{`${item.day}: ${item.hours}`}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4 flex items-center gap-2">
                                        <Briefcase className="w-6 h-6 text-yellow-500"/>
                                        Karriere bei Baku Bau
                                    </h2>
                                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                        <p className="text-gray-700 mb-4">
                                            Sind Sie auf der Suche nach einer neuen beruflichen Herausforderung im
                                            Bauwesen?
                                            Wir sind immer auf der Suche nach talentierten Fachkräften, die unser Team
                                            verstärken.
                                        </p>
                                        <p className="text-gray-700 mb-4">
                                            Senden Sie Ihren Lebenslauf mit Kontaktinformationen an:
                                        </p>
                                        <motion.a
                                            href={`mailto:${contactInfo.careerEmail}`}
                                            className="inline-flex items-center gap-2 text-yellow-600 font-medium hover:text-yellow-700 hover:underline transition-colors"
                                            whileHover={{scale: 1.05}}
                                            whileTap={{scale: 0.95}}
                                        >
                                            <Mail className="w-5 h-5"/>
                                            {contactInfo.careerEmail}
                                        </motion.a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
