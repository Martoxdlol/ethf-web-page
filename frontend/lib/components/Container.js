import classNames from 'classnames'
import styles from '../../styles/components/Container.module.css'


export default function Container({ children, className, style }) {
    return <div className={classNames(styles.main, className)} style={style}>
        {children}
    </div>
}