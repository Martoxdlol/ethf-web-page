import Link from 'next/link';
import { useRouter } from 'next/router';
import { Children, useMemo } from 'react';

export default function ToggleMenuButton({ children }) {
    const router = useRouter()
    const isOpen = router.query.menu === 'open'

    const nextQuery = useMemo(() => {
        const q = { ...router.query }
        if (!isOpen) {
            q.menu = 'open'
        } else {
            delete q.menu
        }
        return q
    }, [isOpen])

    return <Link href={{
        pathname: router.pathname,
        query: nextQuery
    }} replace shallow passHref>
        {children}
    </Link>
}