import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./styles.module.css";
import { ArrowLeftIcon } from "components/icons";

export default function Header({ title, href = "/" }) {
  const { locale } = useRouter();
  return (
    <header className={styles.header}>
      <Link href={href} locale={locale} passHref>
        <ArrowLeftIcon stroke="#fff" className={styles.arrow} />
      </Link>
      <h2 className={styles.title}>{title}</h2>
    </header>
  );
}
