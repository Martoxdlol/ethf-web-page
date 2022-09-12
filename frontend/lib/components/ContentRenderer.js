import { useRouter } from 'next/router'
import { useLayoutEffect, useRef } from 'react'
import styles from '../../styles/ContentRenderer.module.css'
// import pageCss from '../pageCss'

function shouldLoadFullPage(anchorElem) {
    if (e.target.getAttribute('target') === '_blank') {
        return true
    }

    if (e.target.href.search('https://') == 0 || e.target.href.search('http://') == 0) {
        return true
    }

    const url = new URL(window.location.href, e.target.href)
    if (url.pathname.search('/moodle') == 0 || url.pathname.search('/public') == 0 || url.pathname.search('/firmas') == 0) {
        return true
    }

    return false
}

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
                        if (shouldLoadFullPage(e.target)) return
                        e.stopPropagation()
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
                    if (shouldLoadFullPage(e.target)) return
                    e.stopPropagation()
                    e.preventDefault()

                    router.push(e.target.href)
                }
            }}
        />
    </div>
}