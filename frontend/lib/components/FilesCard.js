import styles from "../../styles/components/FilesCard.module.css"
import AutoLink from "./AutoLink"
import MaterialIcon from "./MaterialIcon"

export default function FilesCard({ Files: { data: Files } }) {
    return <div className={styles.card}>
        {Files.map(file => <AutoLink href={file.attributes.url} download={file.attributes.name} target="_blank"><div className={styles.file}>
            <MaterialIcon icon="insert_drive_file" color="black" />
            <p>{file.attributes.name}</p>
            <MaterialIcon icon="download" color="black" />
        </div></AutoLink>)}
    </div>
}

FilesCard.__component = 'components.files-card'