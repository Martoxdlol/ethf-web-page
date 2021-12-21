import { getPagesBooksAndChapters } from "./_get_content"

export function generateGetStaticPaths(requirePageParam) {
    return async () => {
        const paths = []
        const [pages, books, chapters] = await getPagesBooksAndChapters()
        for (const page of pages) {
            const [path1, path2] = page.path.split('/')
            if (requirePageParam && !path2) continue
            paths.push({ params: { book: path1, page: path2 } })
        }

        return { paths, fallback: true }
        // return { paths, fallback: 'blocking' }
    }
}