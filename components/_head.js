import Head from "next/head"

export default function PageHead(props) {
    return <Head>
        <html lang={'es'} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {props.children}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-61MY92XHNB"></script>
        <script>{
`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}  gtag('js', new Date()); gtag('config', 'G-61MY92XHNB');`
        }</script>
    </Head>
}