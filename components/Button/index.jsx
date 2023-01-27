import styles from "./styles.module.css";

export default function Button({ children }) {
  return <button className={styles.btn}>{children}</button>;
}
