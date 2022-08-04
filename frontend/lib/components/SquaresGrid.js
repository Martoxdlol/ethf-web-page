import AspectRatio from '../../styles/components/AspectRatio'
import styles from '../../styles/components/SquaresGrid.module.css'
import StrapiMedia from './StrapiMedia'
import AutoLink from './AutoLink'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'

export default function SquaresGrid({ SquareCards: _SquareCards, Link }) {
    const SquareCards = useMemo(() => {
        return _SquareCards?.filter(card => card.Hide !== true)
    }, [_SquareCards])

    const [rowSize, setRowSize] = useState()

    useEffect(() => {
        function listenResize() {
            let count = 3;
            if (window.innerWidth >= 501) count = 4
            if (window.innerWidth >= 1301) count = 5
            setRowSize(count)
        }
        listenResize()
        window.addEventListener('resize', listenResize)
        return () => window.removeEventListener('resize', listenResize)
    }, [])

    const SquareCardsOrdered = useMemo(() => {
        // Resize and reorder cards to fill all rows
        const totalLen = SquareCards.length
        const totalRows = Math.ceil(totalLen / rowSize)

        const SquareCardsCopy = [...SquareCards]

        const swapWidthLast = (i) => {
            const last = SquareCardsCopy[SquareCardsCopy.length - 1]
            SquareCardsCopy[SquareCardsCopy.length - 1] = SquareCardsCopy[i]
            SquareCardsCopy[i] = last
        }

        let i = 0
        let iterations = 0


        let currentRowSize = 0
        while (i < totalLen) {
            const card = SquareCardsCopy[i]
            if (iterations > rowSize * totalLen) break
            iterations++
            let isDouble = card.DoubleWidth
            let isTriple = card.TripleWidth
            let addToRowSize = 1
            if (isDouble) addToRowSize = 2
            if (isTriple) addToRowSize = 3
            currentRowSize = currentRowSize + addToRowSize
            if (currentRowSize > rowSize) {
                currentRowSize = currentRowSize - addToRowSize
                if (SquareCardsCopy[i - 1] && !SquareCardsCopy[i - 1].DoubleWidth) {
                    SquareCardsCopy[i - 1].DoubleWidth = true
                    currentRowSize += 1
                    continue
                } else {
                    swapWidthLast(i)
                    continue
                }
            }

            // if (i === totalLen - 1 && currentRowSize < rowSize) {
            //     if (!SquareCardsCopy[i - 1].DoubleWidth) SquareCardsCopy[i - 1].DoubleWidth = true
            // }

            if (currentRowSize == rowSize) currentRowSize = 0
            i++
        }



        return SquareCardsCopy
    }, [rowSize, SquareCards])


    return <><div className={styles.grid}>
        {SquareCardsOrdered.map((SquareCard, i) => {
            return <div key={i} className={classNames(styles.card, { [styles.double]: SquareCard.DoubleWidth, [styles.triple]: SquareCard.TripleWidth })}><AutoLink href={SquareCard.Link}>

                <AspectRatio aspectRatio={SquareCard.DoubleWidth ? 50 : 100}>
                    <StrapiMedia src={SquareCard.Media} layout="fill" autoPlay muted loop />
                    <div className={styles.border}></div>
                </AspectRatio>
                {SquareCard.Title && <div className={styles.title}>
                    {SquareCard.Title}
                </div>}

            </AutoLink></div>
        })}
    </div>
        {Link && <center><AutoLink href={Link} style={{ color: '#0f79b3', fontWeight: '600' }}>Ver más →</AutoLink></center>}
    </>
}

SquaresGrid.__component = 'components.squares-grid'