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
            LargeMedia: { populate: "*" },
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
    const { URL_Name, MainContent, Title, Pretitle, Subtitle, Video_or_Image, Content, NavigationMenu, ReplaceGlobalNavigationMenu, Metadata, LargeMedia, Category } = props.attributes

    const alt = Video_or_Image?.data?.attributes?.alternativeText
    const category = Category?.data?.attributes
    return <>
        <AppHead
            title={Metadata?.Title || Title}
            image={Metadata?.Image?.data?.attributes.url || Video_or_Image?.data?.attributes.url}
            description={Metadata?.Description || Subtitle}
        />
        <Navigation extraLinks={NavigationMenu?.Links ?? []} excludeGlobal={!!ReplaceGlobalNavigationMenu} />
        <Header color="#666" image={Video_or_Image} alt={alt} largeMedia={LargeMedia}>
            <Container className={styles.head}>


                <p className={styles.preTitleLinks}>
                    {category && <><Link href={"/posts/categoria/" + category.slug}>
                        <a>{category.name}</a></Link> | </>}
                    <Link href="/posts"><a>Publicaciones</a>
                    </Link>
                </p>

                <p className={styles.pretitle}>{Pretitle || ''}</p>
                <h1>{Title || ''}</h1>
                <p><b>{Subtitle || ''}</b></p>

            </Container>
        </Header>
        <Container>
            <ContentRenderer content={MainContent} />
            <ComponentsSection components={Content} />
        </Container>
        <Footer />
    </>
}