import AutoLink from '../AutoLink';
import { useContext } from 'react';
import { GlobalContext } from '../../../pages/_app';
import styles from '../../../styles/NavSideMenu.module.css';
import MaterialIcon from '../MaterialIcon';
import Separator from '../Separator';
import ToggleMenuButton from './ToggleMenuButton';

export default function NavSideMenu({ extraLinks, excludeGlobal }) {

    const globalContext = useContext(GlobalContext)
    const { navigation: { Links } } = globalContext


    function RenderLinks({ Links }) {
        return Links.map((link, i) => {
            if (link.isSeparator) {
                return <li className={styles.separator} key={i}>
                    <p>{link.Name}</p>
                </li>
            }
            return <li key={i}><AutoLink href={link}>{link.Icon && <MaterialIcon icon={link.Icon} />}{link.Name}</AutoLink></li>
        })

    }

    return <ToggleMenuButton>
        <div className={styles.div}>
            <nav className={styles.menu}
                onClick={e => e.stopPropagation()}
            >
                <ToggleMenuButton>
                    <a className={styles.close}>
                        <MaterialIcon icon="close" color="black" />
                    </a>
                </ToggleMenuButton>
                <ul className={styles.ul}>
                    {!excludeGlobal && <RenderLinks Links={Links} />}
                    {extraLinks && <RenderLinks Links={extraLinks} />}
                </ul>
            </nav>
        </div>
    </ToggleMenuButton>
}