import React from "react";
import { QuestionModel } from "../../models/Question";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./Question.module.scss";

interface QuestionProps {
  question: QuestionModel;
  onEdit?: () => void;
  onDelete?: (id: string) => void;
}

function Question(props: QuestionProps) {
  const { question, onEdit, onDelete } = props;
  return (
    <div className={styles.content}>
      <div className={styles.buttons}>
        <Button className={styles.edit} variant="icon-edit" onClick={onEdit} />
        <Button
          className={styles.remove}
          variant="icon-remove"
          onClick={() => onDelete && onDelete(question.id)}
        />
      </div>
      <div className={styles.title}>{question.description}</div>
      <div className={styles.options}>
        {question.answers.map((answer) => (
          <Input
            type={question.type}
            variant={question.type}
            name={question.id}
            label={answer.value}
            placeholder="Введите ответ"
            onChange={() => {}}
            key={answer.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
