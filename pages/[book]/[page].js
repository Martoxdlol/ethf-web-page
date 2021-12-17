import Page from './_Page';
import { getInitialProps } from '../../lib/_server_props';
import { generateGetStaticPaths } from '../../lib/_static_paths';

export default Page

export { getInitialProps as getStaticProps }
const getStaticPaths = generateGetStaticPaths(true)
export { getStaticPaths }
