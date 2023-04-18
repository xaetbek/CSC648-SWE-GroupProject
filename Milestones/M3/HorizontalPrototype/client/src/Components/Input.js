import "./style.css";

/**
 * className: default-input
 * width: css width ex) 120px | 100% | 100vw ...
 */

function Input({
  className,
  onChangeEvent,
  value,
  width = "calc(100% - 20px)",
}) {
  return (
    <input
      className={`input ${className}`}
      style={{ width: width }}
      value={value}
      onChange={onChangeEvent}
    />
  );
}

export default Input;
