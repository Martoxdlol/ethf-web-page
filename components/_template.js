import PageHead from "./_head";
import Nav from "./_nav";
import styles from '../styles/PageTemplate.module.css'
import Link from "next/link";
import InfoPanel from "./info_panel";
import Footer from "./footer";

export default function PageTemplate(props) {
    return <>
        <PageHead>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
        </PageHead>
        <header className={styles.header} style={{ backgroundImage: 'url("' + props.image + '")' }}>
            <Nav links={props.navLinks} />
            <div className={styles.overlay}>
                <h1>{props.title}</h1>
            </div>
        </header>
        <InfoPanel links={props.relatedLinks} page={props.page} />
        <main className={styles.main}>
            {props.children}
        </main>
        <Footer/>
    </>
}