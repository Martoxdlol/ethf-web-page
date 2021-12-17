import { useRouter } from "next/router"

export default function LinkConverter({ content, className }) {
    const router = useRouter()


    return (
        <div className={className}
            dangerouslySetInnerHTML={{ __html: content }}
            onClick={(e) => {
                if (e.target.tagName === "A") {
                    e.preventDefault()
                    router.push(e.target.href)
                }
            }}
        />
    )
}