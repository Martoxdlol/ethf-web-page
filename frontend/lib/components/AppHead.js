import Head from "next/head"
import Script from "next/script"

export default function AppHead({ children, title, description, image, url }) {
    return <>
        <Head>
            <link rel="icon" href="/logo128.png" />
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description ?? 'Escuela Secundaria de Educación Técnica Henry Ford'} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={image ?? "portada.webp"} />
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