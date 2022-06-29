import styles from '../../../styles/components/Header.module.css'

export default function BigHeader({ children, image }) {
    return (
        <div className={styles.background} style={{ backgroundImage: 'url("' + image + '")' }}>
            <header className={styles.header}>
                {children}
            </header>
        </div>
    )
}