export default function StrapiMedia({ src, video, ...props }) {
    if (typeof src === 'string' && !video) {
        return <img src={src} {...props} />
    } else if (src?.attributes?.mime.startsWith('video')) {
        return <video {...props} controls>
            <source src={src.attributes.url} />
        </video>
    } else if (src?.attributes?.mime.startsWith('image')) {
        return <img src={src.attributes.url} {...props} />
    }
    return null
}