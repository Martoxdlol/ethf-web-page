import __styles from '../../styles/PageTemplate.module.css'
import styles from '../../styles/Header.module.css'
import Separator from './Separator'
import classNames from 'classnames'
import StrapiMedia from './StrapiMedia'
import { getStrapiMedia } from '../media'


export default function Header({ image, title, subtitle, pretitle, children, color, fullMedia, fullMediaOnMobile }) {
    const showheader = !!image?.data || !!title || !!subtitle || !!pretitle

    if (!showheader) {
        return <div style={{ backgroundColor: color }}>
            <div style={{ height: '48px', backgroundColor: '#666' }}></div>
            {children}
            <Separator />
        </div>
    }

    const imageUrl = (image && image.data) ? getStrapiMedia(image) : null

    const alt = image?.data?.attributes?.alternativeText

    return <header className={classNames(__styles.header, styles.header, { [styles.fullMedia]: fullMedia, [styles.fullMediaOnMobile]: fullMediaOnMobile })}>
        <StrapiMedia src={image} layout="fill" autoPlay loop muted backgroundBlured />
        {showheader && <div className={__styles.overlay}>
            <p>{pretitle}</p>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </div>}
        {children && <div className={styles.children}>
            {children}
        </div>}
    </header>
}


