import AspectRatio from '../../styles/components/AspectRatio'
import styles from '../../styles/components/SquaresGrid.module.css'
import StrapiMedia from './StrapiMedia'
import AutoLink from './AutoLink'

export default function SquaresGrid({ SquareCards }) {
    return <div className={styles.grid}>
        {SquareCards.map((SquareCard, i) => {
            return <div key={i} className={styles.card}><AutoLink href={SquareCard.Link}>

                <AspectRatio>
                    <StrapiMedia src={SquareCard.Media} layout="fill" autoPlay muted loop />
                </AspectRatio>
                {SquareCard.Title && <div className={styles.title}>
                    {SquareCard.Title}
                </div>}

            </AutoLink></div>
        })}
    </div>
}

SquaresGrid.__component = 'components.squares-grid'