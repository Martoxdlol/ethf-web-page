import { fetchAPI } from "../../lib/api"
import AppHead from "../../lib/components/AppHead"
import Container from "../../lib/components/Container"
import ComponentsSection from '../../lib/components/ComponentsSection/ComponentsSection'
import Footer from "../../lib/components/Footer/Footer"
import Header from "../../lib/components/Header"
import { getStrapiMedia } from "../../lib/media"
import Navigation from "../../lib/components/Nav/Nav"
import PageNotFound from "../pagina-no-encontrada"
import { useContext } from "react"
import { GlobalContext } from "../_app"
import ContentRenderer from "../../lib/components/ContentRenderer"
import styles from "../../styles/post.module.css"
import Link from "next/link"
import moment from 'moment'

export async function getStaticPaths(context) {

    const posts = await fetchAPI('/posts', {
        pagination: { pageSize: 10000000, page: 1, },
        filed: ['URL_Name']
    })


    const paths = posts.data.map(post => {
        return { params: { post: post.attributes.URL_Name.split('/') } }
    })

    return {
        paths: paths,
        fallback: 'blocking', // false or 'blocking'
    }
}

export async function getStaticProps(context) {
    const path = context.params.post.join('/')
    const pageRes = await fetchAPI('/posts', {
        populate: {
            Components: { populate: "*" },
            NavigationMenu: { populate: "*" },
            Image: { populate: "*" },
            Category: { populate: "*" },
            Metadata: { populate: "*" },
            MainContent: { populate: "*" },
            Content: { populate: "*" },
            Video_or_Image: { populate: "*" },
            FullMedia: { populate: "*" },
            CreationDate: { populate: "*" },
            Author: { populate: "*" },
            categories: { populate: "*" },
        },
        pagination: {
            pageSize: 1,
            page: 1,
        },
        filters: {
            URL_Name: {
                $eq: path,
            },
        },
    })
    const page = pageRes.data[0] || {}

    return {
        props: { ...page },
        revalidate: 30,
    }
}

export default function PageRenderer(props) {
    if (!props.attributes) return <PageNotFound />
    const { URL_Name,
        MainContent,
        Title,
        Pretitle,
        Subtitle,
        Video_or_Image,
        Content,
        NavigationMenu,
        ReplaceGlobalNavigationMenu,
        Metadata,
        FullMedia,
        CreationDate,
        LastUpdated,
        createdAt,
        updatedAt,
        Author,
        categories,
    } = props.attributes

    const alt = Video_or_Image?.data?.attributes?.alternativeText

    const categoriesList = categories?.data

    const mediaURL = Video_or_Image?.data?.attributes?.url
    const mediaIsVideo = Video_or_Image?.data?.attributes?.mime.startsWith('video')
    const mediaIsImage = Video_or_Image?.data?.attributes?.mime.startsWith('image')

    return <>
        <AppHead
            title={Metadata?.Title || Title}
            image={Metadata?.Image?.data?.attributes.url || Video_or_Image?.data?.attributes.url}
            description={Metadata?.Description || Subtitle}
            type='article'
        />
        <Navigation extraLinks={NavigationMenu?.Links ?? []} excludeGlobal={!!ReplaceGlobalNavigationMenu} />
        <article>
            <Header color="#666" image={Video_or_Image} alt={alt} fullMedia={FullMedia} fullMediaOnMobile={true}>
                <Container className={styles.head}>


                    <p className={styles.preTitleLinks}>
                        {categoriesList?.length && categoriesList.map((category, i) => <><Link href={"/posts/categoria/" + category.attributes.slug}>
                            <a>{category.attributes.name}</a>
                        </Link> | </>
                        )}
                        <Link href="/posts"><a>Publicaciones</a>
                        </Link>
                    </p>

                    <p className={styles.pretitle}>{Pretitle || ''}</p>
                    <h1 className={styles.title}>{Title || ''}</h1>
                    <p><b>{Subtitle || ''}</b></p>

                </Container>
            </Header>
            <Container>
                <p className={styles.dateIndicator}>
                    <i>
                        {CreationDate && <time dateTime={CreationDate}>
                            {moment(CreationDate, 'YYYY-MM-DD').format('D [de] MMMM [de] YYYY').toLocaleLowerCase()}
                        </time>}
                        {(Author && CreationDate) && " - "}
                        {Author}
                    </i>
                </p>
                <ContentRenderer content={MainContent} />
                <ComponentsSection components={Content} />
            </Container>
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "BlogPosting",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "https://www.henryford.edu.ar/posts/" + URL_Name,
                        },
                        "headline": Title,
                        ...mediaIsImage ? {
                            "image": {
                                "@type": "ImageObject",
                                "url": mediaURL,
                                // "height": 463,
                                // "width": 700
                            }
                        } : {},
                        ...mediaIsVideo ? {
                            "video": {
                                "@type": "VideoObject",
                                "url": mediaURL,
                                // "height": 463,
                                // "width": 700
                            }
                        } : {},
                        "datePublished": CreationDate || createdAt,
                        "dateModified": LastUpdated || updatedAt,
                        "author": {
                            "@type": Author ? "Person" : "Organization",
                            "name": Author || 'Escuela Técnica Henry Ford'
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": 'Escuela Técnica Henry Ford',
                            // "logo": {
                            //     "@type": "ImageObject",
                            //     "url": "http://applefostering.co.uk/apple-logo-schema/",
                            //     "width": 550,
                            //     "height": 60
                            // }
                        },
                        "description": Subtitle,
                        "articleBody": MainContent,
                        "articleSection": categoriesList[0]?.attributes.name,
                    })
                }}>
            </script>
        </article>
        <Footer />
    </>
}