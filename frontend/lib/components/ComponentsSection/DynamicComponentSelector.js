import ImageCard from '../ImageCard'
import ContentRenderer from '../ContentRenderer'
import Slideshow from '../SlideShow'
import LeftImageCard from '../LeftImageCard'
import SquaresGrid from '../SquaresGrid'
import AutoLink from '../AutoLink'
import FilesCard from '../FilesCard'
import AspectRatio from '../../../styles/components/AspectRatio'
import SizedView from '../SizedView'
import LinkList from '../LinkList'

function SectionTitle({ content, html_id }) {
    return <h2 style={{ textAlign: 'center', fontWeight: '500' }} className="scroll-to-section" id={html_id}>{content}</h2>
}
SectionTitle.__component = 'components.title'

function Paragraph({ content }) {
    return <ContentRenderer content={content} />
}
Paragraph.__component = 'components.paragraph'

function LabelLink({ Label, Link: link }) {
    return <p>{Label}: <AutoLink href={link} >{link.label}</AutoLink></p>
}
LabelLink.__component = 'components.label-link'

function LeftImageCardComp({ Image, Info, Link, MaxHeight }) {
    return <LeftImageCard media={Image} info={Info} link={Link} maxHeight={MaxHeight} />
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
    const c = <div style={{
        display: 'block',
        backgroundColor: color || '#33DD33',
        padding: '10px 14px',
        color: textColor || 'white',
        margin: '10px 0',
        textAlign: 'center',
        fontSize: '21px',
        fontWeight: 'bold',
    }}><ContentRenderer content={Label} /></div>

    return <AutoLink href={link}>
        {c}
    </AutoLink>
}
BigColorLinkButton.__component = 'components.big-color-link-button'

function IframeView({ src, width, height }) {
    return <SizedView width={width} height={height}>
        <iframe src={src} style={{ border: '0', width: '100%', height: '100%' }}></iframe>
    </SizedView>
}

IframeView.__component = 'components.iframe'

function LinkListComp({ links }) {
    return <LinkList links={links.map(link => {
        return {
            title: link.Title,
            media: link.Media,
            description: link.Description,
            url: link.Link,
        }
    })} />
}

LinkListComp.__component = 'components.link-list'

const components = [
    ImageCard,
    SectionTitle,
    Paragraph,
    LabelLink,
    HTMLRender,
    Multimedia,
    LeftImageCardComp,
    BigColorLinkButton,
    SquaresGrid,
    FilesCard,
    IframeView,
    LinkListComp,
]

export default function DynamicComponentSelector({ component }) {
    for (const Component of components) {
        if (Component.__component === component.__component) {
            return <Component {...component} />
        }
    }
    return ''
}

