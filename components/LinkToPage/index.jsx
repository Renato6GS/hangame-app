import React from "react";
import Link from "next/link";

import styles from "./styles.module.css";
import { ArrowNarrowRightIcon } from "components/icons";

export default function LinkToPage({ contain, href = "/", center = true, locale }) {
  return (
    <Link href={href} passHref locale={locale}>
      <a className={`${styles.anchorContainer} ${center ? styles.positionCenter : styles.positionRigth}`}>
        <span className={styles.link}>{contain}</span>
        <ArrowNarrowRightIcon />
      </a>
    </Link>
  );
}
