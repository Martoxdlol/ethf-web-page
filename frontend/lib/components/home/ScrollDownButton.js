import styles from '../../../styles/components/ScrollDownButton.module.css'
import { UrlObject } from 'url';
import Link from 'next/link';

export default function ScrollDownButton({ href }) {
    return (
        <Link href={href}>
            <a className={styles.icon}>
                <img src="/arrow-down-navigate.svg" width="70px" height="70px" alt="Bajar" />
            </a>
        </Link>

    );
}