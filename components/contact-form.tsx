"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Send, Loader2 } from "lucide-react"

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500))

        toast({
            title: "Nachricht erfolgreich gesendet",
            description: "Vielen Dank! Wir werden uns in Kürze bei Ihnen melden.",
            duration: 5000,
        })

        setIsSubmitting(false)
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            subject: "",
            message: ""
        })
    }

    const inputVariants = {
        focus: {
            scale: 1.02,
            transition: { duration: 0.2 }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Vorname <span className="text-yellow-600">*</span>
                    </label>
                    <motion.div whileFocus="focus" variants={inputVariants}>
                        <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            placeholder="Max"
                            className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-lg"
                        />
                    </motion.div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Nachname <span className="text-yellow-600">*</span>
                    </label>
                    <motion.div whileFocus="focus" variants={inputVariants}>
                        <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            placeholder="Mustermann"
                            className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-lg"
                        />
                    </motion.div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        E-Mail <span className="text-yellow-600">*</span>
                    </label>
                    <motion.div whileFocus="focus" variants={inputVariants}>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="ihre-email@beispiel.de"
                            className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-lg"
                        />
                    </motion.div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                        Betreff
                    </label>
                    <motion.div whileFocus="focus" variants={inputVariants}>
                        <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Anfrage für Projekt"
                            className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-lg"
                        />
                    </motion.div>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Ihre Nachricht <span className="text-yellow-600">*</span>
                </label>
                <motion.div whileFocus="focus" variants={inputVariants}>
                    <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Beschreiben Sie Ihr Anliegen. Wir werden uns umgehend mit Ihnen in Verbindung setzen."
                        className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-lg"
                    />
                </motion.div>
            </div>

            <div className="pt-4">
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Wird gesendet...</span>
                            </>
                        ) : (
                            <>
                                <Send className="h-5 w-5" />
                                <span>Nachricht senden</span>
                            </>
                        )}
                    </Button>
                </motion.div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                    Mit * markierte Felder sind Pflichtfelder
                </p>
            </div>
        </form>
    )
}
