import Link from 'next/link';
import { useContext } from 'react';
import { GlobalContext } from '../../../pages/_app';
import styles from '../../../styles/NavSideMenu.module.css';
import MaterialIcon from '../MaterialIcon';
import ToggleMenuButton from './ToggleMenuButton';

export default function NavSideMenu({ extraLinks, excludeGlobal }) {

    const globalContext = useContext(GlobalContext)
    const { navigation: { Links } } = globalContext


    function RenderLinks({ Links }) {
        return Links.map((link, i) => {
            if (link.isSeparator) {
                return <li className={styles.separator} key={i}>
                    <hr style={{ border: 'none', height: '1px' }} />
                    <p>{link.Name}</p>
                </li>
            }
            return <li key={i}><Link href={link.href} target={link.target}><a>{link.Icon && <MaterialIcon icon={link.Icon} />}{link.Name}</a></Link></li>
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