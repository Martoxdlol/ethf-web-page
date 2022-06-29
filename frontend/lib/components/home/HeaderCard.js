import classNames from "classnames";
import Link from "next/link";
import { MouseEventHandler } from "react";
import styles from "../../../styles/components/HeaderCard.module.css";
import { UrlObject } from 'url';

export default function HeaderCard({ href, onClick, title, description }) {

    const a = <a className={classNames(styles.card, styles.header)} onClick={onClick}>
        <h2>{title} &rarr;</h2>
        <p>{description}</p>
    </a>

    if (href !== undefined && href !== null) {
        return <Link href={href}>{a}</Link>
    }

    return a
}