export default function MaterialIcon({ icon, color, ...props }) {
    return <i className='material-icons' style={{userSelect: 'none', color }} {...props}>{icon}</i>;
}