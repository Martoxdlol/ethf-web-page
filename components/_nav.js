import Link from "next/link"

export default function Nav(props) {
    let links = props.links || []
    links = [{ name: "Inicio", path: '/' }, ...links]
    return <div>
        <ul>
            {links.map(link => <li key={link.path}>
                <Link href={link.path != '/' ? '/' + link.path : '/'}>
                    <a>
                        {link.name}
                    </a>
                </Link>
            </li>
            )}
        </ul>
    </div>
}