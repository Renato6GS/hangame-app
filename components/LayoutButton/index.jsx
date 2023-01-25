import React from "react";

import styles from "./styles.module.css";

export default function LayoutButton({ children }) {
  return <div className={styles.linksContainer}>{children}</div>;
}
