import { parse, TextNode } from 'node-html-parser';
import { BOOKSTACK_URL } from '../config/constants';

export default function processPageHtml(page) {
    const root = parse(page.html)
    const links = root.querySelectorAll('a')

    // Reemplazar links
    for (const link of links) {
        let url = link.getAttribute('href')
        if (url && url.search(BOOKSTACK_URL) == 0) {
            url = url.replace(BOOKSTACK_URL, '/')
            link.setAttribute('href', url)
        }
    }

    page.image = getImage(root)
    // page.sections = analizeSections(root)
    page.html = root.toString()
}

function getImage(root) {
    const img = root.querySelector('img')
    let src = null
    if (img) {

        let parent = img.parentNode
        let child = img
        if (parent.tagName == 'A') {
            parent = parent.parentNode
            child = parent
        }
        if (parent.tagName == 'P') {
            parent = parent.parentNode
            child = parent
        }
        while (parent) {
            if (parent.childNodes && parent.childNodes[0] && parent.childNodes[0].tagName == 'IMG') {
                src = img.getAttribute('src')
                img.parentNode.removeChild(img)
            } else if (parent.childNodes) {
                parent = parent.childNodes[0]
            } else {
                parent = null
            }
        }
    }

    return src
}

// Sections types: card, separator, title
export function analizeSections(page) {
    const root = parse(page.html)
    const sections = []
    let section = null
    let pos = 0
    let urlGot = false
    let imgGot = false
    if (root && root.childNodes) {
        for (const elem of root.childNodes) {
            if (elemStartSection(elem)) {
                pos = 0
                urlGot = false
                imgGot = false
                if (section) sections.push(section)
                section = {
                    type: 'none',
                    title: '',
                    html: '',
                    text: '',
                    image: '',
                    alt: '',
                    url: null,
                }
            }
            if (!elem.tagName) continue

            const deepest = findDeepestChild(elem)

            if (elem.tagName == 'HR' || deepest.tagName == 'HR') {
                section.type == 'separator'

            } else if (elem.tagName == 'H3') {
                section.type == 'card'
                section.title = elem.innerText
                if (deepest.tagName == 'A') {
                    section.url = deepest.getAttribute('href') || null
                }
            } else if (elem.tagName == 'H2') {
                section.type = 'title'
                section.title = elem.innerText
            } else if (deepest.tagName == 'A' && pos < 3 && !urlGot) {
                section.url = deepest.getAttribute('href') || null
                urlGot = true
            } else if (elem.tagName == 'P' && deepest.tagName != 'IMG' && (elem == deepest || urlGot)) {
                section.html += elem.toString()
                section.text += elem.innerText + '\n'
            } else if (deepest.tagName == 'IMG') {
                if (!imgGot) {
                    section.image = deepest.getAttribute('src') || null
                    section.alt = deepest.getAttribute('alt') || null
                } else {
                    deepest.setAttribute('height: 45px')
                    section.html += elem.toString()
                }
            }
            pos++
        }
    }
    if (section) sections.push(section)
    return sections
}

function elemStartSection(elem) {
    const openingSectionTags = new Set(['H2', 'H3', 'H4', 'HR'])
    return openingSectionTags.has(elem.tagName) || openingSectionTags.has(findDeepestChild(elem));
}

function findDeepestChild(parent) {
    let child = parent
    while (child) {
        if (child.childNodes && child.childNodes.length == 1) {
            if (child.childNodes[0] instanceof TextNode) break
            child = child.childNodes[0]
        } else {
            break
        }
    }
    return child
}