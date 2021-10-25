import React from "react";
import { AnswerModel } from "../../../models/Answer";
import { UserAnswer } from "../../../models/UserAnswer";
import Input from "../../Input/Input";
import styles from "./Answer.module.scss";

interface AnswerProps {
  answer: AnswerModel;
  group: string;
  order: number;
  type: string;
  questionValue: string;
  userAnswer: UserAnswer | undefined;
  previewMode?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Answer(props: AnswerProps) {
  const {
    answer,
    order,
    group,
    type,
    questionValue,
    userAnswer,
    previewMode = false,
    onChange,
  } = props;

  let answerClassname;

  switch(type) {
    case 'input':
      answerClassname = userAnswer && answer.value === userAnswer?.value ? styles['user-correct'] : styles.correct;
      break;
    default:
      answerClassname = userAnswer ? (answer.correct ? styles['user-correct'] : styles['user-incorrect']) : (answer.correct ? styles.correct : "");
      break;
  }

  return (
    <>
      {previewMode ? (
        <div className={answerClassname}>
          {order + 1 + ". " + answer.value}
          {type === "input" && answer.value !== userAnswer?.value && (
              <span className={styles['user-incorrect']}> {userAnswer?.value}</span>
          )}
        </div>
      ) : (
        <Input
          type={type}
          variant={type}
          name={group}
          label={answer.value}
          value={type !== "input" ? answer.value : questionValue}
          placeholder="Введите ответ"
          onChange={onChange}
        />
      )}
    </>
  );
}

export default Answer;
