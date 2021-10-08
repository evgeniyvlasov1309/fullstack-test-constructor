import React, { useEffect, useRef } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  variant?: string;
  className?: string;
  label?: string;
  focus?: boolean;
  [index: string]: any;
}

function Input(props: InputProps) {
  const { variant = "input", focus, className, label, ...rest } = props;
  const inputEl = useRef<any>(null);

  useEffect(() => {
    if (focus) {
      inputEl.current.focus();
    }
  }, [focus]);

  return variant === "input" ? (
    <input ref={inputEl} className={`${styles[variant]} ${className}`} {...rest} />
  ) : (
    <label>
      <input ref={inputEl} className={`${styles[variant]} ${className}`} {...rest} />
      <span className={styles.label}>{label}</span>
    </label>
  );
}

export default Input;
