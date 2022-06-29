import styles from '../../styles/PageTemplate.module.css'
import headerStyles from '../../styles/EditableHeader.module.css'
import TextField from './TextField'
import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadImage } from '../images/uploadImage'

interface HeaderProps {
    pretitle: string
    title: string
    subtitle: string
    image: string
    onTitleChange: (title: string) => void
    onSubtitleChange: (subtitle: string) => void
    onPretitleChange: (pretitle: string) => void
    onImageChange: (image: string) => void
}

export default function EditableHeader({ image, title, subtitle, pretitle, onPretitleChange, onSubtitleChange, onTitleChange, onImageChange }: HeaderProps) {
    const [draggind, setDragging] = useState(false)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setDragging(false)
        const file = acceptedFiles[0]
        if(file) {
            const reader = new FileReader()
            reader.onload = async () => {
                const data = reader.result?.toString().split(',')[1]
                const url = await uploadImage(data!)
                onImageChange(url)
            }
            reader.readAsDataURL(file)
        }
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDragEnter: () => setDragging(true),
        onDragLeave: () => setDragging(false),
        onDragOver: () => setDragging(true),
        onDrop,
        accept: { 'image/*': [] }
    })

    return <header className={classNames(styles.header, headerStyles.header)} style={{ backgroundImage: 'url("' + image + '")' }}>
        <div className={classNames(styles.overlay, headerStyles.overlay, headerStyles.content)}>
            <input className={classNames(headerStyles.input, headerStyles.pInput)} value={pretitle} onChange={e => onPretitleChange(e.target.value)} />
            <input className={classNames(headerStyles.input, headerStyles.h1input)} value={title} onChange={e => onTitleChange(e.target.value)} />
            <input className={classNames(headerStyles.input, headerStyles.h2input)} value={subtitle} onChange={e => onSubtitleChange(e.target.value)} />
        </div>
        <div className={headerStyles.editOverlay}
            style={{ borderColor: draggind ? 'yellowgreen' : '#666' }}
            {...getRootProps({ refKey: 'innerRef' })}
        >
            <input {...getInputProps()} />
            <h2>Haz click o suelta una imagen aquí para cambiar el fondo</h2>
        </div>
    </header>
}


