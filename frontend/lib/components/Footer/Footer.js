import styles from '../../../styles/Footer.module.css'
import templateStyles from '../../../styles/components/Container.module.css'
import Image from 'next/image'
import ComponentsSection from '../ComponentsSection/ComponentsSection'
import { useContext } from 'react'
import { GlobalContext } from '../../../pages/_app'
import { getStrapiMedia } from '../../media'

export default function Footer(props) {
    const globalContext = useContext(GlobalContext)

    const { footer: { attributes: footer }, mediaLinks: { attributes: mediaLinks } } = globalContext

    const components = footer.Components
    const mediaLinkButtons = mediaLinks.MediaLinksButtons

    return <footer className={`${styles.footer} ${templateStyles.main}`}>
        <hr />
        <ComponentsSection components={components} />
        <hr />

        <div className={styles.social}>

            {mediaLinkButtons.map((linkButton, i) => {
                return <figure key={i}>
                    <a href={linkButton.Link} rel="noreferrer" target="_blank">
                        <Image src={getStrapiMedia(linkButton.Icon)} alt={linkButton.name} width={55} height={55} />
                    </a>
                </figure>
            })}
        </div>
        {/* {editHref && <Link href={editHref}>
            <a style={{ fontSize: '9px', position: 'absolute' }}>editar</a>
        </Link>} */}
    </footer>
}