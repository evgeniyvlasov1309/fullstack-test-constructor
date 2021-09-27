import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  variant?: "button" | "link" | "icon-remove" | "icon-open";
  className?: string;
  children?: React.ReactFragment;
  [index: string]: any;
}

function Button(props: ButtonProps) {
  const {variant = 'button', className, children, ...rest} = props;
  return (
    <button
      className={`${styles[variant]}${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
