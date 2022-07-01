import styles from '../../../styles/components/Header.module.css'
import StrapiMedia from '../StrapiMedia'
import { useEffect, useRef, useState } from 'react'

export default function BigHeader({ children, image, video, videoDelay }) {
    const ref = useRef(null)
    const [showVideo, setShowVideo] = useState(false)
    // $0.play().then(() => alert())

    useEffect(() => {
        if (!video) return

        const timer = setTimeout(() => {
            ref.current?.play().then(() => {
                setShowVideo(true)
                // ref.current.pause
            })
        }, videoDelay ?? 700)

        function scrollListener(e) {
            ref.current && (ref.current.style.marginTop = `${window.pageYOffset}px`)
        }

        window.addEventListener('scroll', scrollListener)

        return () => {
            clearTimeout(timer)
            window.removeEventListener('scroll', scrollListener)
        }
    }, [])

    return (
        <div className={styles.background} style={{ backgroundImage: 'url("' + image + '")' }}>
            {video && <div className={styles.video} style={{ opacity: showVideo ? 1 : 0, transition: '1s' }}>
                <StrapiMedia src={video} muted loop useRef={ref} />
            </div>}
            <header className={styles.header}>
                {children}
            </header>
        </div>
    )
}