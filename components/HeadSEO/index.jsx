import { useI18N } from "context/i18n";
import Head from "next/head";

export default function HeadSEO({ title, description }) {
  const { t } = useI18N();

  return (
    <Head>
      <title>{t(title)}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <meta property="og:title" content="Hangame - Juego del ahorcado" />
      <meta property="og:site_name" content="Hangman" />
      <meta property="og:url" content="https://hangame.app/" />
      <meta property="og:description" content="" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/image_site.png"></meta>
    </Head>
  );
}
