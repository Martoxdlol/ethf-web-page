import { getAllLinks, getPageById, getPageByPath, getRelatedLinks } from "./_get_content"

function getPath(context) {
    if (context.params.page) {
        return context.params.book + '/' + context.params.page
    }
    return context.params.book
}

export async function getInitialProps(context) {
    const path = getPath(context)
    const page = await getPageByPath(path)
    let fullPage = page ? await getPageById(page.id) : null
    const relatedLinks = page ? await getRelatedLinks(path) : null
    const navLinks = await getAllLinks()
    if (fullPage) {
        fullPage = { ...page, ...fullPage }
        fullPage.name = page.name
    }
    return {
        props: { page: fullPage, navLinks, relatedLinks },
    }
}

