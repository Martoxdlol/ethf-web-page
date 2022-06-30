import ImageCard from '../ImageCard'
import Link from 'next/link'
import Image from 'next/image'
import ContentRenderer from '../ContentRenderer'
import { getStrapiMedia } from '../../media'
import Slideshow from '../SlideShow'
import LeftImageCard from '../LeftImageCard'

function SectionTitle({ content, html_id }) {
    return <h2 style={{ textAlign: 'center', fontWeight: '500' }} className="scroll-to-section" id={html_id}>{content}</h2>
}
SectionTitle.__component = 'components.title'

function Paragraph({ content }) {
    return <ContentRenderer content={content} />
}
Paragraph.__component = 'components.paragraph'

function LabelLink({ Label, Link: link }) {
    return <p>{Label}: <Link href={link.href} ><a target={link.target}>{link.label}</a></Link></p>
}
LabelLink.__component = 'components.label-link'

function LeftImageCardComp({ Image, Info, Link, MaxHeight }) {
    return <LeftImageCard src={Image.data} info={Info} link={Link} maxHeight={MaxHeight} />
}
LeftImageCardComp.__component = 'components.left-image-card'

function HTMLRender({ Code, CSS }) {
    return <ContentRenderer content={Code} css={CSS} />
}
HTMLRender.__component = 'components.html'

function Multimedia({ Media, Caption, ObjectFit, AutoSlide, Height, Width }) {
    const elements = Media.data
    return <Slideshow
        media={elements}
        objectFit={ObjectFit}
        Caption={Caption}
        AutoSlide={AutoSlide}
        height={Height}
        width={Width}
    />
}
Multimedia.__component = 'components.multimedia'

function BigColorLinkButton({ Label, Link: link, color, textColor }) {
    const c = <a style={{
        display: 'block',
        backgroundColor: color || '#33DD33',
        padding: '10px 14px',
        color: textColor || 'white',
        margin: '10px 0',
        textAlign: 'center',
        fontSize: '21px',
        fontWeight: 'bold',
    }}><ContentRenderer content={Label} /></a>
    if (link) {
        return <Link href={link.url} target={link.url}>{c}</Link>
    }
    return c
}
BigColorLinkButton.__component = 'components.big-color-link-button'

const components = [
    ImageCard,
    SectionTitle,
    Paragraph,
    LabelLink,
    HTMLRender,
    Multimedia,
    LeftImageCardComp,
    BigColorLinkButton,
]

export default function DynamicComponentSelector({ component }) {
    for (const Component of components) {
        if (Component.__component === component.__component) {
            return <Component {...component} />
        }
    }
    return ''
}

