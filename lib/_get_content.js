const tokenId = 'OEBugmcnoq0EfFzUAIbvjAVgbXiSaPat'
const apiToken = '68mwpjEh48PgZStYIoYh3kPP8LaG63qk'

const pagesByPath = {}
const pagesById = {}
const pagesByBookId = {}
const pagesByChapterId = {}
const bookById = {}
const chapterById = {}

export { pagesByPath }

export async function getPageById(id) {
    const res = await fetch('https://wiki.henryford.edu.ar/api/pages/' + id, { headers: { Authorization: `Token ${tokenId}:${apiToken}` } })
    const page = await res.json()
    return page
}

export async function getBookById(id) {
    const res = await fetch('https://wiki.henryford.edu.ar/api/books/' + id, { headers: { Authorization: `Token ${tokenId}:${apiToken}` } })
    const book = await res.json()
    return book
}

export async function getPageByPath(path, failnext = false) {
    // && (process.env.NODE_ENV != 'development' || failnext)
    if (pagesByPath[path]) {
        return pagesByPath[path]
    } else if (!failnext) {
        await getPagesBooksAndChapters()
        return getPageByPath(path, true)
    }
    return null
}

export async function getPagesBooksAndChapters() {
    const res_pages = await fetch('https://wiki.henryford.edu.ar/api/pages', { headers: { Authorization: `Token ${tokenId}:${apiToken}` } })
    const pages = await res_pages.json()
    const res_books = await fetch('https://wiki.henryford.edu.ar/api/books', { headers: { Authorization: `Token ${tokenId}:${apiToken}` } })
    const books = await res_books.json()
    const res_chapters = await fetch('https://wiki.henryford.edu.ar/api/chapters', { headers: { Authorization: `Token ${tokenId}:${apiToken}` } })
    const chapters = await res_chapters.json()
    if (pages.error) {
        throw new TypeError("code: " + pages.error.code + ", " + pages.error.message)
    }
    if (books.error) {
        throw new TypeError("code: " + books.error.code + ", " + books.error.message)
    }
    if (chapters.error) {
        throw new TypeError("code: " + chapters.error.code + ", " + chapters.error.message)
    }
    for (const book of books.data) {
        bookById[book.id] = book
    }
    for (const chapter of chapters.data) {
        chapterById[chapter.id] = chapter
    }
    const p = []
    for (const page of pages.data) {
        let path
        if (page.slug == 'index' && page.book_slug == 'default') {
            path = 'index'
            page.name = 'Inicio'
        } else if (page.book_slug == 'default') {
            path = page.slug
        } else if (page.slug == 'index') {
            path = page.book_slug
            page.name = bookById[page.book_id].name
        } else {
            path = page.book_slug + '/' + page.slug
        }

        if (!pagesByBookId[page.book_id]) pagesByBookId[page.book_id] = new Set()
        pagesByBookId[page.book_id].add(page.id)
        if (page.chapter_id != 0) {
            if (!pagesByChapterId[page.chapter_id]) pagesByBookId[page.chapter_id] = new Set()
            pagesByChapterId[page.chapter_id].add(page.id)
        }
        page.path = path
        pagesByPath[path] = page
        pagesById[page.id] = page
        p.push(page)
    }
    return [p, books.data, chapters.data]
}

export async function getLinks(path, failnext = false) {
    if (pagesByPath[path]) {
        const page = pagesByPath[path]
        const chapter_id = page.chapter_id
        const book_id = page.book_id
        const pages_links = []
        if (chapter_id != 0) {
            pages_links.push(...pagesByChapterId[chapter_id])
        } else {
            pages_links.push(...pagesByBookId[book_id])
        }
        const links = []
        for (const id of pages_links) {
            const p = pagesById[id]
            if (p.slug == 'index') continue
            links.push({ path: p.path, name: p.name })
        }
        for (const book_id in bookById) {
            const book = bookById[book_id]
            if (pagesByPath[book.slug]) {
                links.push({ path: book.slug, name: book.name })
            }
        }
        if (book_id == 'default') {

        }
        return links
    } else if (!failnext) {
        await getPagesBooksAndChapters()
        return getPageByPath(path, true)
    }
    return null
}