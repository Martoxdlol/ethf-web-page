import { fetchAPI } from "../../lib/api"
import AppHead from "../../lib/components/AppHead"
import Container from "../../lib/components/Container"
import Footer from "../../lib/components/Footer/Footer"
import Header from "../../lib/components/Header"
import SquaresGrid from "../../lib/components/SquaresGrid"
import Navigation from "../../lib/components/Nav/Nav"
import styles from "../../styles/post.module.css"


export async function getStaticProps() {
    const [categories, pageData] = await Promise.all([
        fetchAPI('/categories', {
            populate: 'deep,2'
        }),
        fetchAPI('/posts-page', {
            populate: 'deep,5'
        })
    ])


    return {
        props: { categories: categories.data, page: pageData.data },
        revalidate: 30,
    }

}

export default function PostsPage({ categories, page: { attributes: page } }) {
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
            <SquaresGrid SquareCards={categories?.map(category => {
                return {
                    Title: category.attributes.name,
                    Media: category.attributes.media,
                    Link: `/posts/categoria/${category.attributes.slug}`
                }
            }) || []} />
        </Container>
        <Footer />
    </>
}