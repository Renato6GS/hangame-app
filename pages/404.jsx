import HeadSEO from "components/HeadSEO";
import Layout from "components/Layout";
import { useI18N } from "context/i18n";
import Link from "next/link";

import styles from "./404.module.css";

export default function Custom404() {
  const { t } = useI18N();

  return (
    <>
      <HeadSEO title="404_PAGE_NOT_FOUND" description={"Página no encontrada"} />
      <Layout titleHeader="404">
        <main className={styles.mainContainer}>
          <h1>{t("404_PAGE_NOT_FOUND")}</h1>
          <p>{t("404_PAGE_NOT_FOUND_DESCRIPTION_1")}</p>
          <p>{t("404_PAGE_NOT_FOUND_DESCRIPTION_2")}</p>
          <p>{t("404_PAGE_NOT_FOUND_DESCRIPTION_3")}</p>
          <section className={styles.buttonsContainer}>
            <Link href={`/Game/${t("404_PAGE_NOT_FOUND_LINK")}`}>
              <a>{t("404_PAGE_NOT_FOUND_BUTTON_YES")}</a>
            </Link>
            <Link href={"/"}>
              <a>{t("404_PAGE_NOT_FOUND_BUTTON_NO")}</a>
            </Link>
          </section>
        </main>
      </Layout>
    </>
  );
}
