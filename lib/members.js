// FILE COPIED AND MODIFIED FROM https://flaviocopes.com/nextjs-cache-data-globally/

import fs from 'fs'
import path from 'path'
import { getPagesBooksAndChapters } from './_get_content'

const MEMBERS_CACHE_PATH = process.env.MEMBERS_CACHE_PATH || path.resolve('.members')
const CACHE_TIME = process.env.NODE_ENV == 'development' ? 20000 : 20000

export default async function cacheGetPagesBooksAndChapters() {
    let cachedData

    try {
        const cachedDataElem = JSON.parse(
            fs.readFileSync(MEMBERS_CACHE_PATH, 'utf8')
        )
        // Cache max live 20 seconds
        if (cachedDataElem.timestamp + CACHE_TIME < Date.now()) {
            fs.unlinkSync(MEMBERS_CACHE_PATH)
            return await cacheGetPagesBooksAndChapters()
        }
        console.log("Cache readed", cachedDataElem.timestamp)
        cachedData = cachedDataElem.data
    } catch (error) {
        console.log('Member cache not initialized')
    }

    if (!cachedData) {
        const data = await getPagesBooksAndChapters(true)

        const store_elem = {
            data,
            timestamp: Date.now(),
        }

        try {
            fs.writeFileSync(
                MEMBERS_CACHE_PATH,
                JSON.stringify(store_elem),
                'utf8'
            )
            console.log('Wrote to members cache', store_elem.timestamp)
        } catch (error) {
            console.log('ERROR WRITING MEMBERS CACHE TO FILE')
            console.log(error)
        }

        cachedData = data
    }

    return cachedData
}