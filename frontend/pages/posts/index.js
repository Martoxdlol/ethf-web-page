import { fetchAPI } from "../../lib/api"
import AppHead from "../../lib/components/AppHead"
import Container from "../../lib/components/Container"
import ComponentsSection from '../../lib/components/ComponentsSection/ComponentsSection'
import Footer from "../../lib/components/Footer/Footer"
import Header from "../../lib/components/Header"
import { getStrapiMedia } from "../../lib/media"
import Navigation from "../../lib/components/Nav/Nav"
import PageNotFound from "../pagina-no-encontrada"
import ContentRenderer from "../../lib/components/ContentRenderer"
import styles from "../../styles/post.module.css"
import ImageCard from "../../lib/components/ImageCard"
import Link from 'next/link'
import LeftImageCard from "../../lib/components/LeftImageCard"

export async function getStaticProps() {
    const [posts, pageData] = await Promise.all([
        fetchAPI('/posts', {
            pagination: { pageSize: 10000000, page: 1, },
            filed: ['URL_Name', 'Title', 'Subtitle', 'Video_or_Image'],
            populate: {
                Video_or_Image: { populate: "*" },
            }
        }),
        fetchAPI('/posts-page', {
            // populate: "*"
        })
    ])

    return {
        props: { posts: posts.data, page: pageData.data }
    }

}

export default function PostsPage({ posts, page: { attributes: page } }) {
    return <>
        <AppHead
            title={"Publicaciones"}
            // image={}
            description={"Noticias, eventos, artículos, y publicaciones"}
        />
        <Navigation white />
        <Header color="#666">
            <Container className={styles.head}>
                {/* <p className={styles.pretitle}></p> */}
                <h1>{page?.Title || ''}</h1>
                <p><b>{page?.Subtitle || ''}</b></p>
            </Container>
        </Header>
        <Container>
            {/* <ContentRenderer content={MainContent} />
            <ComponentsSection components={Content} /> */}
            {posts.map(({ attributes: post }, i) => <Link href={'/posts/' + post.URL_Name} key={i}>
                <a><LeftImageCard title={post.Title || ''} info={post.Subtitle || ''} media={post.Video_or_Image} /></a>
                {/* <a><ImageCard Title={post.Title} Description={post.Subtitle} Image={post.Video_or_Image} /></a> */}
            </Link>)}
        </Container>
        <Footer />
    </>
}