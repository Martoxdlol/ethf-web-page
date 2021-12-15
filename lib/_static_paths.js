import { getPagesBooksAndChapters } from "./_get_content"

export async function getStaticPaths() {
    const paths = []
    const [pages, books, chapters] = await getPagesBooksAndChapters()
    for (const page of pages) {
        const [path1, path2] = page.path
        paths.push({ params: { book: path1, page: path2 } })
    }

    return { paths, fallback: 'blocking' }
}