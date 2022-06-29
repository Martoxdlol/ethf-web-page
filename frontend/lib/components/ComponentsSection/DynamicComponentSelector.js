import ImageCard from '../ImageCard'
import Link from 'next/link'
import Image from 'next/image'
import ContentRenderer from '../ContentRenderer'
import { getStrapiMedia } from '../../media'

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

const components = [ImageCard, SectionTitle, Paragraph, LabelLink]

export default function DynamicComponentSelector({ component }) {
    for (const Component of components) {
        if (Component.__component === component.__component) {
            return <Component {...component} />
        }
    }
    return ''
}

