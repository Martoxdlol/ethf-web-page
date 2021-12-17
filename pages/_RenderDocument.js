
import { UnsafeHtml } from '../components/_unsafe_html'
import styles from '../styles/render_document.module.css'

export default function RenderDocument(props) {
    const page = props.page
    return <UnsafeHtml html={page ? page.html : ''} className={styles.c} />
}