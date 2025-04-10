import Image from "next/image"

export function ContactHero() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <img
                src="/contsct.jpg"
                alt="Baku Bau Construction"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
    )
}

