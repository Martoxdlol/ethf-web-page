import PageHead from "./_head";
import Nav from "./_nav";
import styles from '../styles/PageTemplate.module.css'

export default function PageTemplate(props) {
    return <>
        <PageHead>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
        </PageHead>
        <header>
            <Nav links={props.links}/>
        </header>
        <main className={styles.main}>
            {props.children}
        </main>
        <footer>

        </footer>
    </>
}