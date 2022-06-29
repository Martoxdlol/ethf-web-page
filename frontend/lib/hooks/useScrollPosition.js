import { useEffect, useState } from "react";


export default function useScrollPosition() {
    const [pos, setPos] = useState(typeof window !== 'undefined' ? { x: window.pageXOffset, y: window.pageYOffset } : { x: 0, y: 0 })
    useEffect(() => {
        const handler = () => {
            setPos({ x: window.pageXOffset, y: window.pageYOffset })
        }

        window.addEventListener('scroll', handler)

        return () => {
            window.removeEventListener('scroll', handler)
        }
    }, [])
    return pos
}