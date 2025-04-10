'use client'
import { motion } from "framer-motion"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import {ContactHero} from "@/components/contact-hero";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center">
                {/* Background with overlay */}
             <ContactHero/>

                {/* Hero content */}
                <div className="container relative z-10 px-6 text-center">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Kontaktieren Sie Uns
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Wir sind für Sie da, um Ihr nächstes Bauprojekt zu verwirklichen.
                        Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
                    </motion.p>
                </div>
            </section>

            {/* Main Content - Desktop: Map on left, Content on right */}
            <div className="flex flex-col lg:flex-row">
                {/* Left Side - Full-height Map (Desktop) */}
                <motion.div
                    className="lg:w-1/2 h-[50vh] lg:h-auto lg:min-h-[800px] lg:sticky lg:top-0 order-2 lg:order-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="w-full h-full relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.058131071929!2d6.903346676694214!3d50.83008715995655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf22f2c163619f%3A0xd8308923d39ed3b2!2sBurgstra%C3%9Fe%203%2C%2050321%20Br%C3%BChl%2C%20Almanya!5e0!3m2!1str!2saz!4v1740742972457!5m2!1str!2saz"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </motion.div>

                {/* Right Side - Content */}
                <div className="lg:w-1/2 py-16 px-6 order-1 lg:order-2">
                    <div className="max-w-2xl mx-auto space-y-16">
                        {/* Anfahrt Section - Mobile only */}
                        <div className="lg:hidden">
                            <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Anfahrt</h2>
                            <div className="bg-white rounded-xl shadow-lg p-4">
                                <p className="text-gray-700 mb-2 font-medium">Burgstraße 3, 50321 Brühl, Almanya</p>
                                <a
                                    href="https://maps.google.com/?q=Burgstraße+3,+50321+Brühl,+Germany"
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
                            className="bg-white rounded-2xl shadow-xl p-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Kontaktformular</h2>
                            <ContactForm />
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl p-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <ContactInfo />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
