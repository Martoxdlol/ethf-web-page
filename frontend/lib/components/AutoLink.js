import Link from 'next/link'

export default function AutoLink({ href, children, className, linkProps, ...fullProps }) {
    if (!href) return children

    let hrefUrl = null
    let attributes = {}

    if (typeof href === 'string') {
        hrefUrl = href
    } else {
        if(href.attributes) attributes = href.attributes
        if(href.data?.attributes) attributes = href.data.attributes
        if(!href.attributes && typeof href === 'object') attributes = href
        hrefUrl = attributes.href
    }

    if (!hrefUrl) return children

    const props = {}

    if(attributes.target) props.target = attributes.target
    if(attributes.label) props.title = attributes.label
    if(attributes.isExternal) props.rel = 'nofollow noopener noreferrer'

    return <Link href={hrefUrl} {...linkProps}>
        <a {...props} {...fullProps} className={className}>{children}</a>
    </Link>
}