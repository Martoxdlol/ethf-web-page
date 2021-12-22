import xml from 'xml'
import { getAllLinks, getPagesBooksAndChapters, _linkPath } from "../../lib/_get_content";

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'text/xml');

    const [pages] = await getPagesBooksAndChapters()

    console.log(pages)

    const xml_links = [
        // Default url
        {
            url: [
                { loc: '/', },
                { changefreq: 'weekly' },
                { priority: 1 },
            ]
        }
    ]

    for (const page of pages) {
        if (page.path == 'system/index') continue

        const url = _linkPath(page.path)

        let priority = page.path.split('/').length == 1 ? 0.9 : 0.8
        if (url == '/') priority = 1

        xml_links.push({
            url: [
                { loc: url, },
                { lastmod: page.updated_at.split('T')[0] },
                { changefreq: 'monthly' },
                { priority },
            ]
        })
    }

    console.log(xml_links)

    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xml(xml_links)}
</urlset>`);
}