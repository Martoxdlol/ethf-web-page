import { getBookById, getLinks, getPageById, getPageByPath } from "./_get_content"

function getPath(context) {
    if (context.params.page) {
        return context.params.book + '/' + context.params.page
    }
    return context.params.book
}

// REPLACE LINKS

export async function getInitialProps(context) {
    const path = getPath(context)
    const page = await getPageByPath(path)
    const fullPage = page ? await getPageById(page.id) : null
    const links = page ? await getLinks(path) : null
    if (fullPage) {
        fullPage.path = page.path
        fullPage.name = page.name
    }
    return {
        props: { page: fullPage, links },
    }
}

