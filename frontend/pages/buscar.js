import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { fetchAPI } from "../lib/api"
import AppHead from "../lib/components/AppHead"
import Container from "../lib/components/Container"
import Footer from "../lib/components/Footer/Footer"
import Header from "../lib/components/Header"
import LinkList from "../lib/components/LinkList"
import Navigation from "../lib/components/Nav/Nav"
import styles from '../styles/Search.module.css'

async function fetchResults(searchTerm) {
    const [pages, posts, categories] = await Promise.all([
        fetchAPI('/pages', {
            populate: 'deep,2',
            filters: makePageSearchQuery(searchTerm)
        }),
        fetchAPI('/posts', {
            populate: 'deep,2',
            filters: makePostSearchQuery(searchTerm)
        }),
        fetchAPI('/categories', {
            populate: 'deep,2',
            filters: makeCategorySearchQuery(searchTerm)
        })
    ])

    const searchResults = []

    for (const page of pages.data) {
        searchResults.push({
            title: page.attributes.Title,
            media: page.attributes.Image,
            description: page.attributes.Subtitle,
            url: '/' + page.attributes.URL_Name,
        })
    }

    for (const page of posts.data) {
        searchResults.push({
            title: page.attributes.Title,
            media: page.attributes.Video_or_Image,
            description: page.attributes.Subtitle,
            url: '/posts/' + page.attributes.URL_Name,
        })
    }

    for (const page of categories.data) {
        searchResults.push({
            title: page.attributes.name,
            description: "Publicaciones en categoría “" + page.attributes.name + "”",
            url: '/posts/categoria/' + page.attributes.slug,
        })
    }

    return searchResults
}

PostsPage.getInitialProps = async function getInitialProps(context) {
    const searchTerm = (context.query.q || '') + ''
    if (!searchTerm) return { searchResults: [], searchTerm: null }

    return {
        props: { searchResults: await fetchResults(searchTerm), searchTerm }
    }

}

export default function PostsPage({ searchResults: _searchResults, searchTerm: _searchTerm }) {
    const router = useRouter()
    const [searchResults, setSearchResults] = useState(_searchResults)
    const [searchTerm, setSearchTerm] = useState(_searchTerm)

    useEffect(() => {
        if (!searchResults) {
            if (!searchTerm) {
                setSearchResults([])
                setSearchTerm(null)
                return
            }
            fetchResults(searchTerm).then(results => setSearchResults(results))
        }
    }, [searchResults, searchTerm])


    function SearchForm() {
        return <form action="/buscar" className={styles.form} onSubmit={e => {
            e.preventDefault()
            setSearchResults(null)
            setSearchTerm(document.getElementById('search-input').value || null)
            router.push('/buscar', {
                query: {
                    q: document.getElementById('search-input').value
                }
            })
        }}>
            <input type="text" name="q" placeholder="Buscar" defaultValue={searchTerm} id="search-input" className={styles.text} />
            <input type={'submit'} value={'Buscar'} className={styles.submit} />
        </form>
    }

    return <>
        <AppHead
            title={"Buscar"}
            // image={}
            description={" "}
        />
        <Navigation white />
        <br/>
        <br/>
        <br/>
        <Container className={styles.search}>
            <div>
                <h1>Buscar</h1>
                <SearchForm />
                {searchTerm === null ? <>
                </> : <>
                    {searchResults?.length === 0 ? <h2>No se encontraron resultados</h2> : <h2>Resultados de búsqueda de "{searchTerm}"</h2>}
                    {searchResults === null ? <p>Buscando...</p> : <LinkList links={searchResults} />}
                </>}

            </div>
        </Container>
        <Footer />
    </>
}



function makePageSearchQuery(searchTerm) {
    return {
        $or: [
            {
                URL_Name: {
                    $contains: searchTerm
                },
            },
            {
                Title: {
                    $contains: searchTerm
                },
            },
            {
                Subtitle: {
                    $contains: searchTerm
                },
            },
            {
                Pretitle: {
                    $contains: searchTerm
                }
            },
            {
                Description: {
                    $contains: searchTerm
                }
            },
        ]
    }
}

function makePostSearchQuery(searchTerm) {
    return {
        $or: [
            {
                URL_Name: {
                    $contains: searchTerm
                },
            },
            {
                Title: {
                    $contains: searchTerm
                },
            },
            {
                Subtitle: {
                    $contains: searchTerm
                },
            },
            {
                Pretitle: {
                    $contains: searchTerm
                }
            },
            {
                MainContent: {
                    $contains: searchTerm
                }
            },
        ]
    }
}

function makeCategorySearchQuery(searchTerm) {
    return {
        $or: [
            {
                name: {
                    $contains: searchTerm
                },
            },
            {
                slug: {
                    $contains: searchTerm
                },
            },
        ]
    }
}