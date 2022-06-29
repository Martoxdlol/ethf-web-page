import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { GlobalContext } from "../../../pages/_app";
import styles from '../../../styles/Nav.module.css';
import useScrollPosition from "../../hooks/useScrollPosition";
import MaterialIcon from "../MaterialIcon";
import NavSideMenu from "./NavSideMenu";
import ToggleMenuButton from "./ToggleMenuButton";

export default function Navigation({ white, extraLinks, excludeGlobal }) {
  const scrollPos = useScrollPosition()
  const navRef = useRef(null)

  const router = useRouter()
  const isOpen = router.query.menu === 'open'

  const globalContext = useContext(GlobalContext)
  const { navigation: { Links } } = globalContext

  /* eslint-disable */
  if (typeof window !== 'undefined') {
    // ignore react-hooks/rules-of-hooks

    useLayoutEffect(() => {
      if (white) return
      if (scrollPos.y === 0) navRef.current?.classList.remove(styles.white)
      else navRef.current?.classList.add(styles.white)
    }, [scrollPos])

    useLayoutEffect(() => {
      window.document.body.style.overflowY = isOpen ? 'hidden' : 'auto'
    }, [isOpen])
  }
  /* eslint-enable */

  const filteredLinks = useMemo(() => {
    const l = []
    if (!excludeGlobal) {
      l.push(...Links)
    }
    if (extraLinks) {
      l.push(...extraLinks)
    }
    return l.filter(link => !link.isSeparator && link.DesktopNavBarVisible)
  })

  return (
    <>
      <nav className={classNames(styles.nav, { [styles.white]: white })} ref={navRef}>
        <div className={styles.logo}>
          <Link href="/"><a><Image src='/logo128.png' width={60} height={60} /></a></Link>
        </div>

        {/* Normal desktop menu */}
        <ul className={styles.ul}>
          {filteredLinks.map((link, i) => <li key={i} className={styles.li}>
            <Link href={link.href} target={link.target}>{link.Name}</Link>
          </li>)}
        </ul>
        <ul className={styles.icon}>
          <ToggleMenuButton><a><MaterialIcon icon="menu" /></a></ToggleMenuButton>
        </ul>
      </nav>
      {isOpen && <NavSideMenu extraLinks={extraLinks} excludeGlobal={excludeGlobal} />}
    </>
  )
}