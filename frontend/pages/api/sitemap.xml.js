import xml from 'xml'
import { fetchAPI } from '../../lib/api'

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/xml')

    const pages = await fetchAPI('/pages')
    const posts = await fetchAPI('/posts')

    const list = []

    const base = 'henryford.edu.ar'

    console.log()

    for (const { attributes: page } of pages.data) {
        // console.log(page)
        list.push({
            url: [
                { loc: 'https://' + base + '/' + page.URL_Name },
                { lastmod: page.createdAt },
                { changefreq: 'monthly' },
                { priority: '0.8' },
            ]
        })
    }


    for (const { attributes: page } of posts.data) {
        // console.log(page)
        list.push({
            url: [
                { loc: 'https://' + base + '/posts/' + page.URL_Name },
                { lastmod: page.createdAt },
                { changefreq: 'monthly' },
                { priority: '0.5' },
            ]
        })
    }

    const sitemap = xml([
        {
            url: [
                { loc: 'https://' + base + '/' },
                { changefreq: 'monthly' },
                { priority: '1.0' },
            ]
        },
        ...list,
    ])

    res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemap}
    </urlset>`)
}