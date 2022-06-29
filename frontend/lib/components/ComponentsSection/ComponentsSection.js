import DynamicComponentSelector from "./DynamicComponentSelector"

export default function CardsSection({ components }) {
    return components.map((component, i) => {
        return <DynamicComponentSelector key={i} component={component} />
    })
}