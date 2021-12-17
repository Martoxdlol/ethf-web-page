import { BOOKSTACK_URL } from "../config/constants"
import cacheGetPagesBooksAndChapters from "./members"
import processPageHtml from "./_process_page_html"

const tokenId = 'OEBugmcnoq0EfFzUAIbvjAVgbXiSaPat'
const apiToken = '68mwpjEh48PgZStYIoYh3kPP8LaG63qk'

// Store pages and data in a convinient way
let pagesByPath = {}
let pagesById = {}
let pagesByBookId = {}
let pagesByChapterId = {}
let bookById = {}
let chapterById = {}

/* ******* FETCH PAGE ******* */
export async function getPageById(id) {
    const res = await fetch(BOOKSTACK_URL + 'api/pages/' + id, { headers: { Authorization: `Token ${tokenId}:${apiToken}` } })
    const page = await res.json()
    processPageHtml(page)
    return page
}

/* ******* FETCH BOOK ******* */
export async function getBookById(id) {
    const res = await fetch(BOOKSTACK_URL + 'api/books/' + id, { headers: { Authorization: `Token ${tokenId}:${apiToken}` } })
    const book = await res.json()
    return book
}

/* ******* FETCH ALL DATA ******* */
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

/* ******* FETCH DATA AND STORE IT ******* */
export async function getPagesBooksAndChapters(nocache = false) {
    // Use cache
    if (!nocache) {
        let p, b, c
        [p, b, c, {
            pagesByPath,
            pagesById,
            pagesByBookId,
            pagesByChapterId,
            bookById,
            chapterById,
        }] = await cacheGetPagesBooksAndChapters()

        // Fix for Set to JSON
        for (const key in pagesByBookId) {
            pagesByBookId[key] = new Set(pagesByBookId[key])
        }

        return [p, b, c, {
            pagesByPath,
            pagesById,
            pagesByBookId,
            pagesByChapterId,
            bookById,
            chapterById,
        }]
    }

    // fetch functions
    const res_pages = await fetch(BOOKSTACK_URL + 'api/pages', { headers: { Authorization: `Token ${tokenId}:${apiToken}` } })
    const pages = await res_pages.json()
    const res_books = await fetch(BOOKSTACK_URL + 'api/books', { headers: { Authorization: `Token ${tokenId}:${apiToken}` } })
    const books = await res_books.json()
    const res_chapters = await fetch(BOOKSTACK_URL + 'api/chapters', { headers: { Authorization: `Token ${tokenId}:${apiToken}` } })
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

    // Change page properties peneding on name and organization
    const p = []
    for (const page of pages.data) {
        let path
        const book = bookById[page.book_id]
        if (page.slug == 'index' && page.book_slug == 'default') {
            // book = default, page = index -> /
            path = 'index'
            page.name = 'Inicio'
        } else if (page.book_slug == 'default') {
            // If book = default, ignore the 'default' part of the link
            // EXAMPLE: default/about => about
            path = page.slug
        } else if (page.slug == 'index') {
            // If page is index ignore the 'index' part
            // EXAMPLE book = about, page = index -> about
            path = page.book_slug
            page.name = book.name
        } else {
            // EXAMPLE
            // book = about, page = contact -> about/contact
            path = page.book_slug + '/' + page.slug
        }

        // Fast get book by id on local store
        if (!pagesByBookId[page.book_id]) pagesByBookId[page.book_id] = new Set()
        pagesByBookId[page.book_id].add(page.id)

        // Fast get book by chapter_id on local store
        if (page.chapter_id != 0) {
            if (!pagesByChapterId[page.chapter_id]) pagesByBookId[page.chapter_id] = new Set()
            pagesByChapterId[page.chapter_id].add(page.id)
        }

        // Link referencing original data source (bookstack instance)
        const page_bookstack_url = BOOKSTACK_URL + 'books/' + page.book_slug + '/page/' + page.slug

        // Set path to page
        page.path = path
        page.doc_url = page_bookstack_url

        // Add page to fast get by path and id
        pagesByPath[path] = page
        pagesById[page.id] = page

        // Add page to the pages list
        p.push(page)
    }

    // Fix for Set to JSON
    for (const key in pagesByBookId) {
        pagesByBookId[key] = [...pagesByBookId[key]]
    }

    // Return all data
    return [p, books.data, chapters.data, {
        pagesByPath,
        pagesById,
        pagesByBookId,
        pagesByChapterId,
        bookById,
        chapterById,
    }]
}

function _linkPath(path) {
    if (!path && path != '') return '#!'
    if (path == '/') return '/'
    return '/' + path
}

// Get all pages links
export async function getAllLinks() {
    // Fetch all necessary data
    await getPagesBooksAndChapters()
    let defaultLinks = [] // links to pages of the 'default' book
    const links = [] // all other links and sublinks
    for (const book_id in bookById) {

        const book = bookById[book_id]
        const sublinks = []

        // parent book index page. EXAMPLE: about/contact -> about/index
        const bookIndexPage = pagesByPath[book.slug]


        if (book.slug == 'default') {
            // Childs of 'default' book should be treated as parent links
            defaultLinks = sublinks
        } else {
            links.push({
                path: _linkPath(bookIndexPage ? bookIndexPage.path : null),
                name: book.name,
                disabled: !bookIndexPage,
                key: 'book_' + book_id,
                children: sublinks,
            })
        }

        // Set sublinks
        for (const page_id of pagesByBookId[book_id]) {
            const page = pagesById[page_id]
            // If page is index don't add it again
            if (bookIndexPage && bookIndexPage.id == page.id) continue

            sublinks.push({
                name: page.name,
                path: _linkPath(page.path),
                key: 'page_' + page.id,
            })
        }

    }
    return [{ name: 'Inicio', path: '/', key: 'home_/' }, ...defaultLinks, ...links]
}

export async function getRelatedLinks(path, failnext = false) {
    if (pagesByPath[path]) {

        const page = pagesByPath[path]
        const book_id = page.book_id
        const book = bookById[book_id]

        if(!book) return []

        const chapter_id = page.chapter_id
        const pages_links = []

        // If page is in a chapter, related links should be the chapter pages
        // If not, it should be the parent book pages
        if (chapter_id != 0) {
            pages_links.push(...pagesByChapterId[chapter_id])
        } else {
            pages_links.push(...pagesByBookId[book_id])
        }


        const links = []
        // Add link to book index
        const bookIndexPage = pagesByPath[book.slug]
        if (bookIndexPage) {
            links.push({ path: _linkPath(bookIndexPage.path), name: book.name })
        }

        // Add the links
        for (const id of pages_links) {
            const p = pagesById[id]
            if (p.slug == 'index') continue
            links.push({ path: _linkPath(p.path), name: p.name })
        }

        return links

    } else if (!failnext) {
        //Fetch data if necessary
        await getPagesBooksAndChapters()
        return getPageByPath(path, true)
    }
    return null
}