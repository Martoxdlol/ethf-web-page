import styles from '../../styles/components/SlideShow.module.css'
import StrapiMedia from './StrapiMedia';
import MaterialIcon from './MaterialIcon'
import { useLayoutEffect, useRef, useState } from 'react';
import SizedView from './SizedView';

export default function Slideshow({ media, objectFit, Caption, AutoSlide, width, height }) {
    const [pos, setPos] = useState(0)
    const maxPos = media.length - 1
    const ref = useRef(null)


    width = width ?? '100%'
    height = height ?? '60%'

    /* eslint-disable */
    if (typeof window !== 'undefined') {
        // ignore react-hooks/rules-of-hooks
        useLayoutEffect(() => {
            const w = ref.current?.offsetWidth
            ref.current?.scrollTo({ left: w * pos, behavior: "smooth" })
        }, [pos])
    }
    /* eslint-enable */

    return <div><SizedView height={height} width={width}>
        <div style={{ position: 'relative', height: '100%' }}>
            <div className={styles.slide} ref={ref}>
                {pos != 0 && <div className={styles.arrow_prev} onClick={() => setPos(pos - 1)}>
                    <MaterialIcon icon="arrow_back" />
                </div>}
                {maxPos != pos && <div className={styles.arrow_next} onClick={() => setPos(pos + 1)}>
                    <MaterialIcon icon="arrow_forward" />
                </div>}
                {media.map((element, i) => <div className={styles.div} key={i}>
                    <StrapiMedia src={element} objectFit={objectFit} layout='fill' />
                </div>)}
            </div>
        </div>
    </SizedView>
        {Caption && <p className={styles.caption}><i>{Caption}</i></p>}
    </div>
}