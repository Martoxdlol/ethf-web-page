import { fetchAPI } from "../../../lib/api"
import AppHead from "../../../lib/components/AppHead"
import Container from "../../../lib/components/Container"
import Footer from "../../../lib/components/Footer/Footer"
import Header from "../../../lib/components/Header"
import Navigation from "../../../lib/components/Nav/Nav"
import styles from "../../../styles/post.module.css"
import Link from "next/link"
import LeftImageCard from "../../../lib/components/LeftImageCard"
import MaterialIcon from "../../../lib/components/MaterialIcon"

export async function getStaticPaths(context) {

    const categories = await fetchAPI('/categories', {
        pagination: { pageSize: 10000000, page: 1, },
        field: ['URL_Name']
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
        populate: 'deep,3',
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


    const posts = category?.data[0]?.attributes?.posts?.data

    return {
        props: { posts: posts, category: category.data[0] || { attributes: null } }
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
        <Header color="#666" image={category.media}>
            <Container className={styles.head}>
                {/* <p className={styles.pretitle}></p> */}
                <h1>
                    <Link href={'../'}><a className={styles.back}><MaterialIcon icon='arrow_back' /></a></Link>
                    {category?.name || ''}</h1>
                {/* <p><b>{category?.Subtitle || ''}</b></p> */}
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