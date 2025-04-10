"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, Download, ZoomIn, ZoomOut } from "lucide-react"

interface ProjectImage {
    id: number
    category_value: string
    src: string
    alt: string
    title: string
    sort_order: number
}

interface ImageModalProps {
    images: ProjectImage[]
    open: boolean
    onOpenChange: (open: boolean) => void
    currentIndex: number
    onIndexChange: (index: number) => void
}

export function ImageModal({ images, open, onOpenChange, currentIndex, onIndexChange }: ImageModalProps) {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);
    const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    // Reset zoom and position when image changes or modal closes
    useEffect(() => {
        setZoomLevel(1);
        setIsZoomed(false);
        setImagePosition({ x: 0, y: 0 });
    }, [currentIndex, open]);

    const nextImage = () => {
        if (currentIndex < images.length - 1) {
            onIndexChange(currentIndex + 1);
        } else {
            onIndexChange(0);
        }
    };

    const prevImage = () => {
        if (currentIndex > 0) {
            onIndexChange(currentIndex - 1);
        } else {
            onIndexChange(images.length - 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            nextImage();
        } else if (e.key === "ArrowLeft") {
            prevImage();
        } else if (e.key === "Escape") {
            onOpenChange(false);
        }
    };

    const handleZoomIn = () => {
        if (zoomLevel < 3) {
            setZoomLevel(prev => prev + 0.5);
            setIsZoomed(true);
        }
    };

    const handleZoomOut = () => {
        if (zoomLevel > 1) {
            setZoomLevel(prev => prev - 0.5);
            if (zoomLevel - 0.5 <= 1) {
                setIsZoomed(false);
                setImagePosition({ x: 0, y: 0 });
            }
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isZoomed) {
            setIsDragging(true);
            setTouchPosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && isZoomed) {
            const deltaX = e.clientX - touchPosition.x;
            const deltaY = e.clientY - touchPosition.y;

            setImagePosition({
                x: imagePosition.x + deltaX,
                y: imagePosition.y + deltaY
            });

            setTouchPosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const downloadImage = () => {
        if (images[currentIndex]) {
            const link = document.createElement('a');
            link.href = images[currentIndex].src;
            link.download = `project-image-${images[currentIndex].id}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    if (!open || images.length === 0) return null;

    const currentImage = images[currentIndex];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-screen-xl w-full h-[90vh] p-0 bg-black/95 border-none overflow-hidden"
                onKeyDown={handleKeyDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Navigation Controls */}
                <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent">
                    <div className="text-white/90 text-sm flex items-center">
                        <span className="mr-2">{currentIndex + 1} / {images.length}</span>
                        <span className="max-w-md truncate hidden sm:inline">{currentImage?.title}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleZoomOut}
                            disabled={zoomLevel <= 1}
                            className={`p-2 rounded-full ${zoomLevel <= 1 ? 'text-white/40' : 'text-white hover:bg-white/10'} transition-colors`}
                        >
                            <ZoomOut className="h-5 w-5" />
                        </button>

                        <button
                            onClick={handleZoomIn}
                            disabled={zoomLevel >= 3}
                            className={`p-2 rounded-full ${zoomLevel >= 3 ? 'text-white/40' : 'text-white hover:bg-white/10'} transition-colors`}
                        >
                            <ZoomIn className="h-5 w-5" />
                        </button>

                        <button
                            onClick={downloadImage}
                            className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
                        >
                            <Download className="h-5 w-5" />
                        </button>

                        <button
                            onClick={() => onOpenChange(false)}
                            className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Image Container */}
                <div className="w-full h-full flex items-center justify-center">
                    <div
                        className={`relative w-full h-full flex items-center justify-center ${isZoomed ? 'cursor-grab' : ''} ${isDragging ? 'cursor-grabbing' : ''}`}
                        onMouseDown={handleMouseDown}
                    >
                        {currentImage && (
                            <div
                                className="relative transition-transform duration-100"
                                style={{
                                    transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`
                                }}
                            >
                                <Image
                                    src={currentImage.src}
                                    alt={currentImage.alt || "Project image"}
                                    width={1200}
                                    height={800}
                                    className="max-h-[85vh] w-auto object-contain"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors"
                    onClick={prevImage}
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors"
                    onClick={nextImage}
                >
                    <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Caption */}
                {currentImage?.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                        <p className="text-center sm:text-left">{currentImage.title}</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
