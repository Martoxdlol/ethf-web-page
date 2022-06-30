import __styles from '../../styles/PageTemplate.module.css'
import styles from '../../styles/Header.module.css'
import Separator from './Separator'
import classNames from 'classnames'
import Image from 'next/image'


export default function Header({ image, title, subtitle, pretitle, children, color, alt }) {
    const showheader = !!image || !!title || !!subtitle || !!pretitle

    if (!showheader) {
        return <div style={{ backgroundColor: color }}>
            <div style={{ height: '48px', backgroundColor: '#666' }}></div>
            {children}
            <Separator />
        </div>
    }

    return <header className={classNames(__styles.header, styles.header)}>
        {image && <Image src={image} alt={alt} layout='fill' objectFit='cover'></Image>}
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


