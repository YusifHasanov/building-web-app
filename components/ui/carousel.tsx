"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Carousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <div className="relative w-full h-[400px] md:h-[600px]">
      <Image
        src={images[currentIndex] || "/placeholder.svg"}
        alt={`Project image ${currentIndex + 1}`}
        fill
        className="object-cover object-center rounded-lg"
      />
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button variant="outline" size="icon" onClick={prevSlide} className="bg-white/80 hover:bg-white">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button variant="outline" size="icon" onClick={nextSlide} className="bg-white/80 hover:bg-white">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <div key={index} className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`} />
        ))}
      </div>
    </div>
  )
}

