import classNames from 'classnames'
import styles from '../styles/Footer.module.css'
import templateStyles from '../styles/PageTemplate.module.css'

export default function Footer(props) {

    return <footer className={classNames(styles.footer, templateStyles.main)}>
        <hr />
        <h2>Contacto</h2>
        <p>Dirección: <a target="_blank" rel="noreferrer" href="https://goo.gl/maps/W2YNVA4nr5rcGvYdA">Colectora Este N° 34603 (B-1617GTA) Ricardo Rojas - Prov. Buenos Aires, Argentina</a></p>
        <p>Correo electrónico: <a target="_blank" rel="noreferrer" href="mailto:escuela@henryford.edu.ar">escuela@henryford.edu.ar</a></p>
        <p>Teléfono: <a href="tel:+543327428831">03327 428-831</a></p>

        <hr />

        <div className={styles.social}>
            <figure>
                <a href="https://twitter.com/EscuelaFord" rel="noreferrer" target="_blank">
                    <img src="/icons/twitter.svg" alt="Twitter" />
                </a>
            </figure>
            <figure>
                <a href="https://www.instagram.com/escuelatecnicahenryford" rel="noreferrer" target="_blank">
                    <img src="/icons/instagram.svg" alt="Instagram" />
                </a>
            </figure>
            <figure>
                <a href="https://www.youtube.com/channel/UCUPz0NJCQHCOjbyMylHVjGA" rel="noreferrer" target="_blank">
                    <img src="/icons/youtube.svg" alt="Youtube" />

                </a>
            </figure>
            <figure>
                <a href="tel:+543327428831">
                    <img src="/icons/phone.svg" alt="Teléfono" />
                </a>
            </figure><figure><a href="mailto:escuela@henryford.edu.ar" rel="noreferrer" target="_blank">
                <img src="/icons/email.svg" alt="Email" />
            </a>
            </figure>
        </div>

    </footer>
}