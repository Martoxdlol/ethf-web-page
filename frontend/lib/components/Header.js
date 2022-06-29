import styles from '../../styles/PageTemplate.module.css'


export default function Header({ image, title, subtitle, pretitle }) {
    return <header className={styles.header} style={{ backgroundImage: 'url("' + (image ?? 'default.webp') + '")' }}>
        <div className={styles.overlay}>
            <p>{pretitle}</p>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </div>
    </header>
}


