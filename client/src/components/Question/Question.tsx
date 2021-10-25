import React, { useState } from "react";
import { QuestionModel } from "../../models/Question";
import { UserAnswer } from "../../models/UserAnswer";
import Button from "../Button/Button";
import Answer from "./components/Answer";
import styles from "./Question.module.scss";

interface QuestionProps {
  question: QuestionModel;
  userAnswers?: UserAnswer[];
  previewMode?: boolean;
  onEdit?: () => void;
  onDelete?: (id: string) => void;
  onAnswer?: (question: QuestionModel, answerId: string, value: string) => void;
}

function Question(props: QuestionProps) {
  const { question, previewMode, userAnswers, onAnswer, onEdit, onDelete } = props;
  const [value, setValue] = useState<string>('');

  return (
    <div className={styles.content}>
      <div className={styles.buttons}>
        {onEdit && (
          <Button
            className={styles.edit}
            variant="icon-edit"
            onClick={onEdit}
          />
        )}
        {onDelete && (
          <Button
            className={styles.remove}
            variant="icon-remove"
            onClick={() => onDelete && onDelete(question.id)}
          />
        )}
      </div>
      <div className={styles.title}>{question.description}</div>
      <div className={styles.options}>
        {question.answers.map((answer, index) =>
          <Answer
            answer={answer}
            type={question.type}
            order={index}
            group={question.id}
            previewMode={previewMode}
            questionValue={value}
            userAnswer={userAnswers?.find(userAnswer => userAnswer.answer === answer.id)}
            key={answer.id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value);
              onAnswer && onAnswer(question, answer.id, e.target.value)
            }}/>
        )}
      </div>
    </div>
  );
}

export default Question;
