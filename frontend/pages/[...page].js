import { fetchAPI } from "../lib/api"
import AppHead from "../lib/components/AppHead"
import Container from "../lib/components/Container"
import ComponentsSection from '../lib/components/ComponentsSection/ComponentsSection'
import Footer from "../lib/components/Footer/Footer"
import Header from "../lib/components/Header"
import { getStrapiMedia } from "../lib/media"
import Navigation from "../lib/components/Nav/Nav"
import PageNotFound from "./pagina-no-encontrada"

export async function getStaticPaths(context) {

    const pages = await fetchAPI('/pages', {
        pagination: { pageSize: 10000000, page: 1, },
        filed: ['URL_Name']
    })

    const paths = pages.data.map(page => {
        return { params: { page: page.attributes.URL_Name.split('/') } }
    })

    return {
        paths: paths,
        fallback: 'blocking' // false or 'blocking'
    }
}

export async function getStaticProps(context) {
    const path = context.params.page.join('/')
    const pageRes = await fetchAPI('/pages', {
        populate: {
            Components: { populate: "*" },
            NavigationMenu: { populate: "*" },
            Image: { populate: "*" },
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

    return { props: { ...page } }
}

export default function PageRenderer(props) {
    if (!props.attributes) return <PageNotFound />
    const { URL_Name, Title, Pretitle, Subtitle, Image, Components, NavigationMenu, ReplaceGlobalNavigationMenu } = props.attributes

    const image = (Image && Image.data) ? getStrapiMedia(Image) : null

    return <>
        <AppHead
            title={Title}
            image={"image"}
            description={Subtitle}
        />
        <Navigation extraLinks={NavigationMenu?.Links ?? []} excludeGlobal={!!ReplaceGlobalNavigationMenu}/>
        <Header title={Title} pretitle={Pretitle || ''} image={image} subtitle={Subtitle || ''} />
        <Container>
            <ComponentsSection components={Components} />
        </Container>
        <Footer />
    </>
}