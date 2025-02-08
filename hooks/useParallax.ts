import { useTransform, useScroll, type MotionValue } from "framer-motion"
import { useRef, type RefObject } from "react"

export function useParallax(distance = 300): [RefObject<HTMLDivElement>, MotionValue<number>] {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

    return [ref, y]
}

