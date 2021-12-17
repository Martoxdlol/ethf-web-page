import PageTemplate from "../../components/_template"
import RenderDocument from "../_RenderDocument"

export default function Page(props) {
    const { page } = props
    if (!page) {
        return <PageTemplate title={"Página no encontrada"}>
            404
        </PageTemplate>
    }

    return <PageTemplate
        title={page.name}
        navLinks={props.navLinks}
        relatedLinks={props.relatedLinks}
        page={page}
        image={page.image}
    >
        <RenderDocument page={page} />
    </PageTemplate>
}
