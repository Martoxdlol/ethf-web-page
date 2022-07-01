import Image from 'next/image'

export default function StrapiMedia({ src, video, imageStyle, videoStyle, useRef, ...props }) {
    if (src?.data && !src?.attributes) src = src.data

    if (typeof src === 'string' && !video) {
        return <Image itemRef={useRef} src={src} alt={props.alt} width="100%" height="100%" layout="responsive" {...props} style={{ ...imageStyle, ...props.style }} />
    } else if (src?.attributes?.mime.startsWith('video')) {
        return <video {...props} controls style={{ ...props.style, ...videoStyle, }} ref={useRef}>
            <source src={src.attributes.url} />
        </video>
    } else if (src?.attributes?.mime.startsWith('image')) {
        return <Image itemRef={useRef} src={src.attributes.url} alt={src.attributes.alternativeText} width="100%" height="100%" layout="responsive" {...props} style={{ ...imageStyle, ...props.style }} />
    }
    return null
}