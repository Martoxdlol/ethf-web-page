import PageHead from "./_head";
import Nav from "./_nav";
import styles from '../styles/PageTemplate.module.css'
import Link from "next/link";

export default function PageTemplate(props) {
    return <>
        <PageHead>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
        </PageHead>
        <header className={styles.header}>
            <Nav links={props.navLinks}/>
        </header>
        {props.relatedLinks && <aside className={styles.relatedLinks}>
            <ul>
            {props.relatedLinks.map(link => <li key={link.path}>
                <Link href={link.path}>
                    <a>
                        {link.name}
                    </a>
                </Link>
            </li>)}
            </ul>
        </aside>}
        <main className={styles.main}>
            {props.children}
        </main>
        <footer>

        </footer>
    </>
}