import Link from "next/link";
import styles from '../styles/info-panel.module.css'

export default function InfoPanel(props) {
    return <aside className={styles.info_panel}>
        <label>Links relacionados</label>
        <ul>
            {props.links && props.links.map(link => <li key={link.path}>
                <Link href={link.path}>
                    <a>
                        {link.name}
                    </a>
                </Link>
            </li>)}
        </ul>
        {/* {props.page && <>
            <label>Página</label>
            <ul>
                <li><a href={props.page.doc_url}>Editar</a></li>
            </ul>
        </>} */}

    </aside>
}