import React from "react";

import styles from "./styles.module.css";
import { useI18N } from "context/i18n";
import { CohereIcon, MongoDbIcon, NextIcon } from "components/icons";

export default function Footer() {
  const { t } = useI18N();
  return (
    <footer className={styles.footer}>
      <h4 className={styles.description}>
        {t("AUTHOR")}
        <a
          className={`${styles.tag} ${styles.link}`}
          href="https://www.renatogranados.dev"
          target="_blank"
          rel="noopener noreferrer">
          @Renato6GS
        </a>
      </h4>
      <section className={styles.tagsContainer}>
        <a className={styles.tag} href="https://www.mongodb.com/" target={"_blank"} rel="noreferrer">
          <NextIcon />
          Next.js
        </a>
        <a className={styles.tag} href="https://cohere.ai/" target={"_blank"} rel="noreferrer">
          <MongoDbIcon />
          MongoDB
        </a>
        <a className={styles.tag}>
          <CohereIcon />
          Co:here
        </a>
      </section>
    </footer>
  );
}
