import PageTemplate from "../../components/_template"
import { UnsafeHtml } from "../../components/_unsafe_html"

export default function Page(props) {
    const { page } = props
    if (!page) {
        return <PageTemplate title={"Página no encontrada"}>
            404
        </PageTemplate>
    }

    return <PageTemplate title={page.name} navLinks={props.navLinks} relatedLinks={props.relatedLinks}>
        <UnsafeHtml html={page.html} />
    </PageTemplate>
}
