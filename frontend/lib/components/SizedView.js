import AspectRatio from "../../styles/components/AspectRatio";

export default function SizedView({ width, height, children, overflow }) {
    if (typeof width === 'number') width = `${width}px`
    if (typeof height === 'number') height = `${height}px`
    if (typeof height === 'string' && height[height.length - 1] === '%') {
        return <div style={{ width: width ?? '100%' }}>
            <AspectRatio aspectRatio={parseInt(height)}>
                <div style={{ width: '100%', height: '100%', overflow: overflow || 'hidden' }}>
                    {children}
                </div>
            </AspectRatio>
        </div>
    }
    return <div style={{ width: width, height: height, overflow: overflow || 'hidden' }}>
        {children}
    </div>
}