import { useI18N } from "context/i18n";

import styles from "./styles.module.css";

export default function Title({ title = "Sin definir" }) {
  const { t } = useI18N();

  return <h2 className={styles.title}>{t(title)}</h2>;
}
