import styles from "./styles.module.css";

export default function Button({
  children,
  value,
  onClick,
  props,
  fitContent = false,
  disabled = false,
  addBorder = false,
  type = "submit",
}) {
  const classNames = [styles.btn];
  if (addBorder) classNames.push(styles.addBorder);
  if (fitContent) classNames.push(styles.btnFitContent);
  return (
    <button type={type} className={classNames.join(" ")} value={value} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
