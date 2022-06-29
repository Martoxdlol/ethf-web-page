import ImageCard from '../ImageCard'
import Link from 'next/link'
import Image from 'next/image'
import ContentRenderer from '../ContentRenderer'
import { getStrapiMedia } from '../../media'
import Slideshow from '../SlideShow'

function SectionTitle({ content, html_id }) {
    return <h2 style={{ textAlign: 'center', fontWeight: '500' }} id={html_id}>{content}</h2>
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

function LeftImageCard({ }) {
    // return <LeftImageCard />
}
LeftImageCard.__component = 'components.left-image-card'

function HTMLRender({ Code, CSS }) {
    return <ContentRenderer content={Code} css={CSS} />
}
HTMLRender.__component = 'components.html'

function Multimedia({ Media, Caption }) {
    const elements = Media.data.map(m => m.attributes)

    return <Slideshow media={elements}/>
}
Multimedia.__component = 'components.multimedia'

const components = [
    ImageCard,
    SectionTitle,
    Paragraph,
    LabelLink,
    LeftImageCard,
    HTMLRender,
    Multimedia,
]

export default function DynamicComponentSelector({ component }) {
    for (const Component of components) {
        if (Component.__component === component.__component) {
            return <Component {...component} />
        }
    }
    return ''
}

