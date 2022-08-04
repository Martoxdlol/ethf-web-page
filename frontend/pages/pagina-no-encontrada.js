import Link from "next/link";
import AppHead from "../lib/components/AppHead";
import Container from "../lib/components/Container";
import Footer from "../lib/components/Footer/Footer";
import Header from "../lib/components/Header";
// import Navigation from "../lib/components/Nav/Nav";

export function getStaticProps() {
    return { props: {} }
}

export default function PageNotFound() {
    return (<>
        <AppHead title="No se encontró la página" />
        {/* <Navigation /> */}
        <Header title="Página no encontrada" subtitle="Error 404" />
        <Container>
            <h1>La página no existe o no se puede encontrar más con este link</h1>
            <Link href="/"><a style={{ padding: '10px', textAlign: 'center', color: 'white', backgroundColor: '#666', display: 'block' }}>Volver a inicio</a></Link>
        </Container>
        <Footer />
    </>)
}