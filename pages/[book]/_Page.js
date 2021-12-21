import Link from "next/link"
import PageTemplate from "../../components/_template"
import RenderDocument from "../_RenderDocument"

export default function Page(props) {
    const { page } = props
    if (!page) {
        return <PageTemplate title={"Página no encontrada"}>
            <h2>No se pudo encontrar la página buscada.</h2>
            <Link href="/">
                <a className="big-btn">Inicio</a>
            </Link>
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
