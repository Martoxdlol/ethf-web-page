import { useRouter } from 'next/router'
import { useLayoutEffect, useRef } from 'react'
import styles from '../../styles/ContentRenderer.module.css'
// import pageCss from '../pageCss'

export default function ContentRenderer({ content, css }) {
    const ref = useRef(null)
    
    const router = useRouter()

    /* eslint-disable */
    if(typeof window !== 'undefined') {
        useLayoutEffect(() => {
            if(ref.current) {
                const links = ref.current.querySelectorAll('a')
                for(const link of Array.from(links)) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault()
                        router.push(link.href)
                    })
                }
            }
        })
    }
    /* eslint-enable */

    return <div className={styles.content} ref={ref}>
        <div
            dangerouslySetInnerHTML={{ __html: '<style>' + (css ?? '') + '</style>' + content }}
            onClick={(e) => {
                if (e.target.tagName === "A") {
                    e.preventDefault()
                    router.push(e.target.href)
                }
            }}
        />
    </div>
}