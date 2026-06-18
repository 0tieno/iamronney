import { useEffect, useRef } from 'react'
import { annotate } from 'rough-notation'

/**
 * Attaches a rough-notation underline to the returned ref.
 * @param {string} color  - stroke color
 * @param {number} delay  - ms before showing (default 300)
 */
export function useRoughUnderline(color = '#22c55e', delay = 300) {
    const ref = useRef(null)
    useEffect(() => {
        if (!ref.current) return
        const annotation = annotate(ref.current, {
            type: 'underline',
            color,
            strokeWidth: 1.8,
            padding: 2,
            animate: true,
            animationDuration: 500,
            iterations: 2,
        })
        const timer = setTimeout(() => annotation.show(), delay)
        return () => {
            clearTimeout(timer)
            annotation.remove()
        }
    }, [color, delay])
    return ref
}
