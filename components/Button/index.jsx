import styles from "./styles.module.css";

export default function Button({ children, value, onClick, props }) {
  return (
    <button type="button" className={styles.btn} value={value} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
