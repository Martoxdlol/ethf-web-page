import ContentRenderer from "./ContentRenderer";
import StrapiMedia from "./StrapiMedia";
import styles from '../../styles/components/LeftImageCard.module.css'
import Link from "next/link";

export default function LeftImageCard({info, src, link, maxHeight}) {
    const comp = <div className={styles.card} style={{maxHeight}}>
        <div className={styles.image}>
            <StrapiMedia src={src}/>
        </div>
        <div className={styles.info}>
            <ContentRenderer content={info}/>
        </div>
    </div>

    if(link) {
        return <Link href={link.href} target={link.target}><a>{comp}</a></Link>
    }
    return comp
}