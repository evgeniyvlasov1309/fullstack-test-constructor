import React from "react";
import Input from "../Input/Input";
import styles from "./Question.module.scss";

function Question() {
  return (
    <div className={styles.content}>
      <div className={styles.title}>1. Когда появился JavaScript?</div>
      <div className={styles.options}>
        <Input
          type="checkbox"
          variant="checkbox"
          label="1987"
          onChange={() => {}}
        />
        <Input
          type="checkbox"
          variant="checkbox"
          label="2003"
          onChange={() => {}}
        />
        <Input
          type="radio"
          variant="radio"
          label="21312"
          onChange={() => {}}
        />
        <Input
          type="radio"
          variant="radio"
          label="21312"
          onChange={() => {}}
        />
      </div>
    </div>
  );
}

export default Question;
