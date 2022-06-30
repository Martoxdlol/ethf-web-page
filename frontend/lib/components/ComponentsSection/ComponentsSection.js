import DynamicComponentSelector from "./DynamicComponentSelector"

export default function CardsSection({ components }) {
    if(!components) return ''
    return components.map((component, i) => {
        return <DynamicComponentSelector key={i} component={component} />
    })
}