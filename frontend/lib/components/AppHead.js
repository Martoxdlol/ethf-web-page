import Head from "next/head"
import Script from "next/script"
import { useContext } from "react"
import { GlobalContext } from "../../pages/_app"

export default function AppHead({ children, title, description, image, url }) {
    const global = useContext(GlobalContext)

    const defaultImageUrl = global?.app?.attributes?.DefaultImage?.data?.attributes?.url
    const defaultSiteDescription = global?.app?.attributes?.SiteDescription
    const defaultSiteName = global?.app?.attributes?.siteName

    const metaDescription = description || defaultSiteDescription || 'Escuela Secundaria de Educación Técnica Henry Ford'

    return <>
        <Head>
            <link rel="icon" href="/logo128.png" />
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={metaDescription} />
            <meta property="og:title" content={title || defaultSiteName} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={image || defaultImageUrl} />
            <meta property="og:locale" content="es_AR" />
            {url && <meta property="og:url" content={url} />}
            {children}
        </Head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-61MY92XHNB" onLoad={() => {
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                window.dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-61MY92XHNB');
        }} />
    </>
}