import { fetchAPI } from "../../lib/api"
import AppHead from "../../lib/components/AppHead"
import Container from "../../lib/components/Container"
import ComponentsSection from '../../lib/components/ComponentsSection/ComponentsSection'
import Footer from "../../lib/components/Footer/Footer"
import Header from "../../lib/components/Header"
import { getStrapiMedia } from "../../lib/media"
import Navigation from "../../lib/components/Nav/Nav"
import PageNotFound from "../pagina-no-encontrada"
import ContentRenderer from "../../lib/components/ContentRenderer"
import styles from "../../styles/post.module.css"
import ImageCard from "../../lib/components/ImageCard"

export default function PageRenderer(props) {
    return <>
        <AppHead
            title={"Publicaciones"}
            // image={}
            description={"Noticias, eventos, artículos, y publicaciones"}
        />
        <Navigation white />
        <Header color="#666">
            <Container className={styles.head}>
                {/* <p className={styles.pretitle}></p> */}
                <h1>Publicaciones</h1>
                <p><b>Publicaciones creadas por alumnos y docentes de la escuela</b></p>
            </Container>
        </Header>
        <Container>
            {/* <ContentRenderer content={MainContent} />
            <ComponentsSection components={Content} /> */}
            <ImageCard Title="Como crear un post"/>
        </Container>
        <Footer />
    </>
}