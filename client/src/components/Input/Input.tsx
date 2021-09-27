import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  variant?: "textfield" | "checkbox" | "radio";
  className?: string;
  label?: string;
  [index: string]: any;
}

function Input(props: InputProps) {
  const { variant = "textfield", className, label, ...rest } = props;
  return variant === "textfield" ? (
    <input className={`${styles[variant]} ${className}`} {...rest} />
  ) : (
    <label>
      <input className={`${styles[variant]} ${className}`} {...rest} />
      <span className={styles.label}>{label}</span>
    </label>
  );
}

export default Input;
