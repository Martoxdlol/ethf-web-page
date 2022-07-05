import ContentRenderer from "./ContentRenderer";
import StrapiMedia from "./StrapiMedia";
import styles from '../../styles/components/LeftImageCard.module.css'
import AutoLink from "./AutoLink";

export default function LeftImageCard({info, media, link, maxHeight, title}) {
    const comp = <div className={styles.card} style={{maxHeight}}>
        <div className={styles.image}>
            <StrapiMedia src={media} layout='fill' muted autoPlay loop/>
        </div>
        <div className={styles.info}>
            {title && <h3>{title}</h3>}
            <ContentRenderer content={info}/>
        </div>
    </div>

    return <AutoLink href={link}>{comp}</AutoLink>
}