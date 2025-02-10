import Image from "next/image"
import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselDemo({ images }: { images: string[] }) {
    return (
        <Carousel opts={{
            align: "start",
            loop: true,
        }} className="w-full max-w-4xl mx-auto">
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index} className="w-full">
                        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
                            <Image
                                src={image}
                                alt={`Project image ${index + 1}`}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}