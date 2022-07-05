export default function AspectRatio({ children, aspectRatio }) {
    return <div style={{ paddingTop: `${aspectRatio || 100}%`, width: '100%', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0' }}>
            {children}
        </div>
    </div>
}