import { fetchAPI } from "../../../lib/api"
import AppHead from "../../../lib/components/AppHead"
import Container from "../../../lib/components/Container"
import Footer from "../../../lib/components/Footer/Footer"
import Header from "../../../lib/components/Header"
import Navigation from "../../../lib/components/Nav/Nav"
import styles from "../../../styles/post.module.css"
import Link from "next/link"
import LeftImageCard from "../../../lib/components/LeftImageCard"

export async function getStaticPaths(context) {

    const categories = await fetchAPI('/categories', {
        pagination: { pageSize: 10000000, page: 1, },
        filed: ['URL_Name']
    })

    const paths = categories.data.map(category => {
        return { params: { category: category.attributes.slug.split('/') } }
    })

    return {
        paths: paths,
        fallback: 'blocking', // false or 'blocking'
    }
}

export async function getStaticProps(context) {
    const slug = context.params.category.join('/')

    const category = await fetchAPI('/categories', {
        filters: {
            slug: {
                $eq: slug
            }
        },
        pagination: {
            pageSize: 1,
            page: 1,
        },
    })

    const categoryId = category.data[0].id
    console.log(categoryId)

    const [posts] = await Promise.all([
        fetchAPI('/posts', {
            pagination: { pageSize: 10000000, page: 1, },
            filed: ['URL_Name', 'Title', 'Subtitle', 'Video_or_Image'],
            populate: {
                Video_or_Image: { populate: "*" },
            },
            filters: {
                Category: categoryId,
            }
        })
    ])

    return {
        props: { posts: posts.data, category: category.data[0] || { attributes: null } }
    }

}

export default function PostsPage({ posts, category: { attributes: category } }) {
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
                <h1>{category?.name || ''}</h1>
                {/* <p><b>{category?.Subtitle || ''}</b></p> */}
            </Container>
        </Header>
        <Container>
            {/* <ContentRenderer content={MainContent} />
            <ComponentsSection components={Content} /> */}
            {posts.map(({ attributes: post }) => <Link href={'/posts/' + post.URL_Name}>
                <a><LeftImageCard title={post.Title || ''} info={post.Subtitle || ''} media={post.Video_or_Image} /></a>
                {/* <a><ImageCard Title={post.Title} Description={post.Subtitle} Image={post.Video_or_Image} /></a> */}
            </Link>)}
        </Container>
        <Footer />
    </>
}