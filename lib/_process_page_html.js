import { parse } from 'node-html-parser';

export default function processPageHtml(page) {
    const root = parse(page.html)
    const links = root.querySelectorAll('a')
    for (const link of links) {
        let url = link.getAttribute('href')
        if (url && url.search('https://wiki.henryford.edu.ar') == 0) {
            url = url.replace('https://wiki.henryford.edu.ar', '')
            link.setAttribute('href', url)
        }
    }
    page.html = root.toString()
}