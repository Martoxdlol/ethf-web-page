import AspectRatio from '../../styles/components/AspectRatio'
import styles from '../../styles/components/SquaresGrid.module.css'
import StrapiMedia from './StrapiMedia'
import AutoLink from './AutoLink'
import classNames from 'classnames'
import { useMemo } from 'react'

export default function SquaresGrid({ SquareCards: _SquareCards, Link }) {
    const SquareCards = useMemo(() => {
        return _SquareCards?.filter(card => card.Hide !== true)
    })

    return <><div className={styles.grid}>
        {SquareCards.map((SquareCard, i) => {
            return <div key={i} className={classNames(styles.card, { [styles.double]: SquareCard.DoubleWidth })}><AutoLink href={SquareCard.Link}>

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