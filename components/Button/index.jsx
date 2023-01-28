import styles from "./styles.module.css";

export default function Button({ children, value, onClick, props, fitContent = false, disabled = false }) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${fitContent ? styles.btnFitContent : null}`}
      value={value}
      onClick={onClick}
      disabled={disabled}
      {...props}>
      {children}
    </button>
  );
}
