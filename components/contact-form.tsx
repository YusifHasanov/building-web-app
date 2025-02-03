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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <Input id="name" name="name" required placeholder="Ihr vollständiger Name" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          E-Mail
        </label>
        <Input type="email" id="email" name="email" required placeholder="ihre.email@beispiel.de" />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Telefon
        </label>
        <Input type="tel" id="phone" name="phone" placeholder="+49 123 456789" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Nachricht
        </label>
        <Textarea id="message" name="message" required rows={6} placeholder="Wie können wir Ihnen helfen?" />
      </div>

      <Button
        type="submit"
        className="w-full bg-brand-yellow text-brand-black hover:bg-brand-yellow/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
      </Button>
    </form>
  )
}

