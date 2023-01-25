import "../styles/globals.css";
import { useState } from "react";
import { ButtonContextProvider } from "context/buttonContext";
import { I18nProvider, useI18N } from "context/i18n";
import Router from "next/router";
import Loader from "components/Loader";
import Head from "next/head";

const DefaultHeadApp = () => {
  const { t } = useI18N();
  return (
    <Head>
      <title>{t("SEO_DEFAULT_TITLE")}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content="Hangame - Juego del ahorcado" />
      <meta property="og:site_name" content="Hangman" />
      <meta property="og:url" content="https://hangame-app.vercel.app/" />
      <meta property="og:description" content="" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/image_site.png"></meta>
    </Head>
  );
};

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });

  return (
    <>
      <I18nProvider>
        <ButtonContextProvider>
          {loading && <Loader />}
          <DefaultHeadApp />
          <Component {...pageProps} />
        </ButtonContextProvider>
      </I18nProvider>
    </>
  );
}

export default MyApp;
