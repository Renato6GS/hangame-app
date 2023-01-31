import { useI18N } from "context/i18n";
import Head from "next/head";

export default function HeadSEO({ title, description }) {
  const { t } = useI18N();

  return (
    <Head>
      <title>{t(title)}</title>
      <meta name="description" content={description} />
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    </Head>
  );
}
