import styles from '../styles/Home.module.css'
import AppHead from '../lib/components/AppHead'
import Header from '../lib/components/home/BigHeader'
import HeaderCard from '../lib/components/home/HeaderCard'
import ScrollDownButton from '../lib/components/home/ScrollDownButton'
import Navigation from '../lib/components/Nav/Nav'
import Footer from '../lib/components/Footer/Footer'
import Container from '../lib/components/Container'
import { fetchAPI, getStrapiURL } from '../lib/api'
import ComponentsSection from '../lib/components/ComponentsSection/ComponentsSection'
import { getStrapiMedia } from '../lib/media'
// import ContentRenderer from '../lib/components/ContentRenderer'

const Home = ({ homepage }) => {
  const { Title, Subtitle, Image, HomeLinks, Cards } = homepage.attributes
  return (
    <>
      <AppHead title={Title} />
      <Navigation />
      <Header image={getStrapiMedia(Image)}>
        <h1 className={styles.title}>
          {Title}
        </h1>

        <p className={styles.description}>
          {Subtitle}
        </p>

        <div className={styles.grid}>

          {HomeLinks.map(({ id, Title, Description, Link }, i) => <HeaderCard
            key={i}
            title={Title}
            description={Description}
            href={Link?.href}
          />)}
        </div>

        <ScrollDownButton href={{
          hash: '#main'
        }} />
      </Header>
      <Container>
        <ComponentsSection components={Cards} />
      </Container>
      <Footer/>
    </>

  )
}


export async function getStaticProps() {
  const [homePageRes, footerRes] = await Promise.all([
    await fetchAPI("/home-page", {
      populate: {
        HomeLinks: { populate: "*" },
        Image: { populate: "*" },
        Cards: { populate: "*" },
      },
    }),
  ])

  return {
    props: {
      homepage: homePageRes.data,
    },
    revalidate: 25,
  };
}


export default Home
