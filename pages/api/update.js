import cacheGetPagesBooksAndChapters from "../../lib/members";

export default async function handler(req, res) {
    if (req.query.key != 'hfupgrade') {
        res.status(402).end("not allowed")
        return
    }
    const [p, b, c, {
        pagesByPath,
        pagesById,
        pagesByBookId,
        pagesByChapterId,
        bookById,
        chapterById,
    }] = await cacheGetPagesBooksAndChapters()
    let i = 0
    for (const path in pagesByPath) {
        await fetch('http://localhost:3000/' + path)
        i++
    }
    res.end("OK, " + i + " actualizados.")
}