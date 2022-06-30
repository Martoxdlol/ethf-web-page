import page from './pagina-no-encontrada'

export function getStaticProps() {
    return {
        redirect: {
            destination: '/pagina-no-encontrada',
            permanent: false,
        },
    }
}

export default page