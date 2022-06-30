import App from "next/app";
import Head from "next/head";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import '../styles/globals.css'

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global?.app?.attributes?.favicon)}
        />
      </Head>
      <GlobalContext.Provider value={global}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949

export async function getGlobalInitialProps(ctx) {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const [globalRes, footerRes, mediaLinksRes] = await Promise.all([
    fetchAPI("/global", {
      populate: {
        favicon: "*",
        DefaultImage: {
          populate: "*",
        },
        siteName: "*",
        SiteDescription: "*",
        defaultSeo: {
          populate: "*",
        },
        NavigationMenu: {
          populate: "*",
        }
      },
    }),
    fetchAPI("/footer", {
      populate: {
        Components: { populate: "*" },
      },
    }),
    fetchAPI("/media-links", {
      populate: {
        MediaLinksButtons: { populate: "*" },
      }
    }),
  ])
  const navigation = globalRes.data.attributes.NavigationMenu
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: { app: globalRes.data, footer: footerRes.data, mediaLinks: mediaLinksRes.data, navigation } } };
};

MyApp.getInitialProps = getGlobalInitialProps

export default MyApp;