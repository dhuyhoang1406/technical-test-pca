function Button({ children, className = "", ...props }) {
  const fullClassName = ["btn", className].filter(Boolean).join(" ");
  return (
    <button {...props} className={fullClassName}>
      {children}
    </button>
  );
}

export default Button;
