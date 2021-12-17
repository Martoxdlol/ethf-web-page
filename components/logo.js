import Link from "next/link";

export default function Logo(props) {
    return <Link href="/">
        <a style={{position: 'absolute'}}>
            <img src="/logo128.png" alt="Logo de la escuela" style={{height: props.height || '40px', margin: props.margin || '4px'}}/>
        </a>
    </Link>
}