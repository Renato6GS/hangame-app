import React from "react";

import styles from "./styles.module.css";
import Layout from "components/Layout";
import LayoutButton from "components/LayoutButton";
import LinkToPage from "components/LinkToPage";
import { useI18N } from "context/i18n";
import HeadSEO from "components/HeadSEO";

export default function ChangeLanguage() {
  const { t } = useI18N();

  return (
    <div className={styles.container}>
      <HeadSEO title={"SEO_MAIN_MENU"} description="Hangman game - multi language" />

      <Layout footer={true} titleHeader={t("CHANGE_LANGUAGE")}>
        <section className={styles.mainManuContainer}>
          <p className={styles.title}>{t("SELECT_LANGUAGE")}</p>

          <LayoutButton>
            <LinkToPage contain={t("SPANISH")} locale="es" />
            <LinkToPage contain={t("ENGLISH")} locale="en" />
          </LayoutButton>
        </section>
      </Layout>
    </div>
  );
}
