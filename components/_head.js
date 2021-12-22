import Head from "next/head"
import Script from "next/script"

export default function PageHead(props) {
    return <Head>
        <html lang={'es'} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {props.children}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-61MY92XHNB" onLoad={() => {
            window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'G-61MY92XHNB');
        }} />
    </Head>
}