import styles from "./styles.module.css";

export default function SimpleButton({ children, onClick }) {
  return (
    <button className={styles.simpleButton} onClick={onClick}>
      {children}
    </button>
  );
}
