import LinkConverter from "./link_converter";

export function UnsafeHtml(props) {
    return <LinkConverter content={props.html || props.children} className={props.className} />
}