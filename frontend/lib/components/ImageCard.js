import Link from 'next/link'
import Image from 'next/image'
import headerCardStyles from '../../styles/components/HeaderCard.module.css'
import styles from '../../styles/components/ImageCard.module.css'
import { getStrapiURL } from '../api'
import classNames from 'classnames'

export default function ImageCard({ Title, Description, Link: link, Image: image }) {
    const relativeUrl = image?.data?.attributes?.url
    const imageUrl = relativeUrl ? getStrapiURL(relativeUrl) : null

    return <Link href={link?.href || '#!'}>
        <a
            target={link?.target}
            className={classNames(styles.card, { [styles["with-image"]]: !!imageUrl, [styles.noimage]: !imageUrl })}
            style={{ backgroundImage: `url('${imageUrl}')` }}>
            <div className={classNames(styles.info, { [styles.noimage]: !imageUrl })}>
                <h3>{Title}</h3>
                <p>{Description}</p>
            </div>
        </a>
    </Link>
}


ImageCard.__component = 'components.image-card'

