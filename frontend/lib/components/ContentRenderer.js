import { useRouter } from 'next/router'
import { useLayoutEffect, useRef } from 'react'
import styles from '../../styles/ContentRenderer.module.css'
// import pageCss from '../pageCss'

export default function ContentRenderer({ content, css }) {
    const ref = useRef(null)

    const router = useRouter()

    /* eslint-disable */
    if (typeof window !== 'undefined') {
        useLayoutEffect(() => {
            if (ref.current) {
                const links = ref.current.querySelectorAll('a')
                for (const link of Array.from(links)) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault()
                        router.push(link.href)
                    })
                }
            }
        })
    }
    /* eslint-enable */



    return <div className={styles.content + ' ' + '__HTML_CONTENT__'} ref={ref}>
        <div
            dangerouslySetInnerHTML={{ __html: '<style>' + (css ?? '') + '</style>' + content }}
            onClick={(e) => {
                if (e.target.tagName === "A") {
                    e.stopPropagation()

                    if (e.target.getAttribute('target') === '_blank') {
                        console.log("_blank")
                        // window.history.back()
                        window.open(e.target.href, '_blank');
                        return
                    }

                    const url = new URL(window.location.href, e.target.href)
                    if (url.pathname.search('/moodle') == 0 || url.pathname.search('/public') == 0 || url.pathname.search('/firmas') == 0) {
                        console.log("known external link")
                        window.history.back()
                        location.href = e.target.href
                        return
                    }

                    if (e.target.href.search('https://') == 0 || e.target.href.search('http://') == 0) {
                        console.log("http(s)")
                        window.history.back()
                        location.href = e.target.href
                        return
                    }

                    e.preventDefault()
                    router.push(e.target.href)
                }
            }}
        />
    </div>
}