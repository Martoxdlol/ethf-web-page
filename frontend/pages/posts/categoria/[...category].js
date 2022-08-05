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
import SquaresGrid from "../../../lib/components/SquaresGrid"
import StrapiMedia from "../../../lib/components/StrapiMedia"
import SizedView from "../../../lib/components/SizedView"
import AutoLink from "../../../lib/components/AutoLink"
import LinkList from "../../../lib/components/LinkList"

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
        props: { posts: posts, category: category.data[0] || { attributes: null } },
        revalidate: 30
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
                    <Link href={'../'}><a className={styles.back}><MaterialIcon icon='arrow_back' color="white" /></a></Link>
                    {category?.name || ''}</h1>
                {/* <p><b>{category?.Subtitle || ''}</b></p> */}
            </Container>
        </Header>
        <Container>
            <h2>Lista de publicaciones</h2>
            <div>
                <LinkList
                    links={posts?.map(post => {
                        return {
                            title: post.attributes.Title,
                            media: post.attributes.Video_or_Image,
                            description: post.attributes.Subtitle,
                            url: `/posts/${post.attributes.URL_Name}`
                        }
                    })}
                />
            </div>
            {/* 
            <SquaresGrid SquareCards={posts?.map(post => {
                return {
                    Title: post.attributes.Title,
                    Media: post.attributes.Video_or_Image,
                    Link: `/posts/${post.attributes.URL_Name}`,
                }
            }) || []} /> */}
        </Container>
        <Footer />
    </>
}