import Link from "next/link"
import { useEffect, useState } from "react"
import styles from '../styles/Nav.module.css'


function reverseArr(input) {
    var ret = new Array;
    for (var i = input.length - 1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
}


export default function Nav(props) {
    const _window = typeof window != 'undefined' ? window : null
    const links = reverseArr(props.links || [])
    const [onTop, setOnTop] = useState(!(_window?.scrollY > 0))
    useEffect(() => {
        const l = e => {
            setOnTop(!(_window?.scrollY > 0))
        }
        window.addEventListener('scroll', l)
        return () => {
            window.removeEventListener('scroll', l)
        }
    })
    return <nav className={styles.nav} style={{ backgroundColor: onTop ? 'transparent' : 'white' }}>
        <ul>
            {links.map(link => {
                return <li key={link.key}>
                    <Link href={link.path}>
                        <a disabled={link.disabled} style={{ color: onTop ? 'white' : 'black' }}>
                            {link.name}
                        </a>
                    </Link>
                    {link.children && <ul>
                        {link.children.map(link => {
                            return <li key={link.key}>
                                <Link href={link.path}>
                                    <a disabled={link.disabled}>
                                        {link.name}
                                    </a>
                                </Link>
                            </li>
                        })}
                    </ul>}
                </li>
            }
            )}
        </ul>
    </nav>
}