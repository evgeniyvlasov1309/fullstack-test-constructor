import React from "react";
import Button from "../../components/Button/Button";
import Question from "../../components/Question/Question";
import styles from "./TestDetail.module.scss";

function TestDetail() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
      </div>
      <Button className={styles.finish} onClick={() => {}}>
        Завершить
      </Button>
    </div>
  );
}

export default TestDetail;
