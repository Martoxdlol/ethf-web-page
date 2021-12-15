import Head from "next/head"

export default function PageHead(props) {
    return <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {props.children}
    </Head>
}