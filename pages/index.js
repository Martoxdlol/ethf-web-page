import Head from 'next/head'
import styles from '../styles/Home.module.css'
import classNames from 'classnames'
import Link from 'next/link'
import Nav from '../components/_nav'
import { getAllLinks, getPageById, getPageByPath } from '../lib/_get_content'
import Footer from '../components/footer'
import processPageHtml, { analizeSections, getMainSections } from '../lib/_process_page_html'

export default function Home(props) {
  return (<>
    <Head>
      <html lang={'es'} />
      <title>Escuela de Educación Secundaria Técnica Henry Ford</title>
      <meta name="description" content="Escuela secundaria de excelencia en especialización electromecánica.  Accede a información sobre inscripciones e imágenes y contenido sobre la escuela." />
      {/* <meta name="viewport" content="width=device-width, initial-scale=0.9" /> */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.background}>

      <header className={styles.header}>
        <Nav links={props.links} />
        <h1 className={styles.title}>
          Escuela Técnica Henry Ford
        </h1>

        <p className={styles.description}>
          Educación de exelencia, especialización electromecánica
        </p>

        <div className={styles.grid}>

          <Link href="/ingreso">
            <a className={styles.card}>
              <h2>Ingreso 2023 &rarr;</h2>
              <p>Información e instrucciones</p>
            </a>
          </Link>

          <Link href="/galeria">
            <a className={styles.card}>
              <h2>Galería &rarr;</h2>
              <p>Imágenes y videos</p>
            </a>
          </Link>


          <a className={styles.card} href="https://www.henryford.edu.ar/moodle/">
            <h2>Aula virtual &rarr;</h2>
            <p>Acceder a la plataforma</p>
          </a>


          <Link href="#main">
            <a className={styles.card}>
              <h2>Novedades &rarr;</h2>
              <p>
                Última información y eventos
              </p>
            </a>

          </Link>
        </div>
        <a className={classNames(styles.icon, styles['go-down-middle'])} href='#main'>
          <img src="/arrow-down-navigate.svg" width="70px" height="70px" alt="Bajar" />
        </a>
      </header>
    </div>
    <div className={styles.container}>
      <main className={styles.main} id='main'>
        <div className={styles.container}>


          {/* <a
            href="https://www.henryford.edu.ar/public/visita-virtual"
            className={classNames(styles.card, styles.big)}
          >
            <h2>Visita virtual &rarr;</h2>
            <p>Visita interactiva 360° para recorrer la escuela desde la computadora</p>
          </a> */}

          {props.sections.map((section, i) => {
            if (section.type == 'separator') {
              return <hr key={i} />
            }
            if (section.type == 'title') {
              return <h2 key={i}>{section.title}</h2>
            }
            return <a key={i}
              href={section.url}
              className={classNames(styles.card, styles.big)}
              style={section.image ? {
                color: 'white',
                backgroundImage: `url('${section.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                paddingTop: '230px',
              } : null}
            >
              {section.image && <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', margin: '-24px', padding: '18px 26px' }}>
                <h3>{section.title}</h3>
                {/* <p dangerouslySetInnerHTML={{ __html: section.html }} /> */}
                {section.text.trim().split('\n').map((linea, i) => <p key={i}>{linea}</p>)}
              </div>}
              {!section.image && <>
                <h3>{section.title}</h3>
                {/* <p dangerouslySetInnerHTML={{ __html: section.html }} /> */}
                {section.text.trim().split('\n').map((linea, i) => <p key={i}>{linea}</p>)}
              </>}
            </a>
          })}

        </div>
      </main>
      <Footer />
    </div>
  </>)
}



export async function getStaticProps() {
  const page_reference = await getPageByPath('system/index')
  const page = await getPageById(page_reference.id)
  processPageHtml(page)
  page.sections = analizeSections(page)
  const links = await getAllLinks()
  return { props: { links, sections: page.sections }, revalidate: 10 }
}