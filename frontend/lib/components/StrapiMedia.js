import classNames from 'classnames'
import Image from 'next/image'
import styles from '../../styles/components/StrapiMedia.module.css'

export default function StrapiMedia({ src, video, imageStyle, videoStyle, useRef, backgroundBlured, ...props }) {
    if (src?.data && !src?.attributes) src = src.data

    if (typeof src === 'string' && !video) {
        return <Image itemRef={useRef} src={src} alt={props.alt} width="100%" height="100%" layout="responsive" {...props} style={{ ...imageStyle, ...props.style }} />
    } else if (src?.attributes?.mime.startsWith('video')) {
        const c = []
        if (backgroundBlured) {
            return <div className={styles.backgroundBlured}>
                <video {...props} controls className={styles.BGVideo}>
                    <source src={src.attributes.url} />
                </video>
                <video {...props} controls className={classNames(styles.video, props.className)}>
                    <source src={src.attributes.url} />
                </video>
            </div>

        }
        return <video {...props} controls style={{ ...props.style, ...videoStyle, }} ref={useRef} className={classNames(styles.video, props.className)}>
            <source src={src.attributes.url} />
        </video>
        return c
    } else if (src?.attributes?.mime.startsWith('image')) {
        return <Image itemRef={useRef} src={src.attributes.url} alt={src.attributes.alternativeText} width="100%" height="100%" layout="responsive" {...props} style={{ ...imageStyle, ...props.style }} />
    }
    return null
}