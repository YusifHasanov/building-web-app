"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageModalProps {
    images: { src: string; alt: string }[]
    open: boolean
    onOpenChange: (open: boolean) => void
    currentIndex: number
    onIndexChange: (index: number) => void
}

export function ImageModal({ images, open, onOpenChange, currentIndex, onIndexChange }: ImageModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-7xl w-screen h-screen sm:h-[90vh] p-0 bg-black/90">
                <div className="relative h-full flex items-center justify-center">
                    <Button
                        variant="ghost"
                        className="absolute left-2 z-10 h-auto p-2 hover:bg-white/10"
                        onClick={() => onIndexChange((currentIndex - 1 + images.length) % images.length)}
                    >
                        <ChevronLeft className="h-8 w-8 text-white" />
                    </Button>
                    <Button
                        variant="ghost"
                        className="absolute right-2 z-10 h-auto p-2 hover:bg-white/10"
                        onClick={() => onIndexChange((currentIndex + 1) % images.length)}
                    >
                        <ChevronRight className="h-8 w-8 text-white" />
                    </Button>
                    <Button
                        variant="ghost"
                        className="absolute top-2 right-2 z-10 h-auto p-2 hover:bg-white/10"
                        onClick={() => onOpenChange(false)}
                    >
                        <X className="h-6 w-6 text-white" />
                    </Button>
                    <div className="relative w-full h-full">
                        <Image
                            src={images[currentIndex].src || "/placeholder.svg"}
                            alt={images[currentIndex].alt}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

