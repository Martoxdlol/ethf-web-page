import { parse } from 'node-html-parser';
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

export function getMainSections(page) {
    const root = parse(page.html)
    const titles = root.querySelectorAll('h2')

    const sectionsElems = []

    let sectionElems = null
    for (const elem of root.childNodes) {
        if (elem.tagName == 'H2') {
            if (sectionElems) sectionsElems.push(sectionElems)
            sectionElems = []
        }
        sectionElems.push(elem)
    }
    if (sectionElems) sectionsElems.push(sectionElems)

    const sections = []

    for (const elems of sectionsElems) {
        const section = {}
        sections.push(section)
        
        const rootElem = parse('<div>' + elems.join('') + '</div>')

        let a = rootElem.querySelector('a')
        if(a && a.childNodes && a.childNodes[0] && a.childNodes[0].tagName == 'IMG') a.parentNode.removeChild(a) 
        a = rootElem.querySelector('a')


        const title = rootElem.querySelector('h2')
        const img = rootElem.querySelector('img')
        const description = rootElem.querySelector('p')


        if (a) section.url = a.getAttribute('href') || null
        if (title) section.title = title.innerText || null
        if (img) section.image = img.getAttribute('src') || null
        if (description) section.description = description.innerHTML || null
    }

    page.sections = sections
}
