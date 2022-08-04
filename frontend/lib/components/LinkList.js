import styles from "../../styles/components/post.module.css";
import AutoLink from "./AutoLink";
import SizedView from "./SizedView";
import StrapiMedia from "./StrapiMedia";

export default function LinkList({ links }) {
    return links?.map((link, i) => {
        return <div className={styles.categoryPostCard + " " + styles.border} key={i}>
            <AutoLink href={link.url}>
                <div className={styles.categoryPostCard}>
                    <div className={styles.media}>
                        <SizedView width={100} height={80}>
                            <StrapiMedia src={link.media} videoStyle={{ width: '100px', height: '80px' }} muted autoPlay loop />
                        </SizedView>
                    </div>
                    <div className={styles.info}>
                        <h3>{link.title}</h3>
                        <p>{link.description}</p>
                    </div>
                </div>
            </AutoLink>
        </div>
    }) || null
}