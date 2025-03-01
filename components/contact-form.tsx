"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
            title: "Nachricht gesendet",
            description: "Wir werden uns in Kürze bei Ihnen melden.",
        })

        setIsSubmitting(false)
        e.currentTarget.reset()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl w-full mx-auto p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1  sm:grid-cols-2 gap-4 w-full">
                <div className="w-full flex flex-col">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Vorname
                    </label>
                    <Input id="name" name="name" required placeholder="Ihr vollständiger Name" className="w-full"/>
                </div>

                <div className="w-full flex flex-col">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Nachname
                    </label>
                    <Input id="name" name="name" required placeholder="Ihr vollständiger Name" className="w-full"/>
                </div>

                <div className="w-full flex flex-col">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        E-Mail-Adresse eingeben <span className={"text-red-600"}>*</span>
                    </label>
                    <Input type="email" id="email" name="email" required placeholder="info@bakubau.de"
                           className="w-full"/>
                </div>

                <div className="w-full flex flex-col">
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Betreff eingeben
                    </label>
                    <Input type="tel" id="phone" name="phone" placeholder="+49 1521 3007777" className="w-full"/>
                </div>
            </div>


            <div className="w-full flex flex-col">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Nachricht eingeben
                </label>
                <Textarea id="message" name="message" required rows={6} placeholder="Wie können wir Ihnen helfen?"
                          className="w-full" />
            </div>

            <Button
                type="submit"
                className="w-full bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 py-2 text-lg font-semibold"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
            </Button>
        </form>
    )
}
