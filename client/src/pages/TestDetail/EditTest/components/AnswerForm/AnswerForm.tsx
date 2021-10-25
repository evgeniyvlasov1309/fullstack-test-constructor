import React, { useEffect, useState } from "react";
import Button from "../../../../../components/Button/Button";
import Input from "../../../../../components/Input/Input";
import styles from "./AnswerForm.module.scss";

interface AnswerFormProps {
  order: number;
  value: string;
  correct: boolean;
  questionType: string;
  onSave: (value: string, correct: boolean) => void;
  onDelete: () => void;
}

function AnswerForm(props: AnswerFormProps) {
  const { order, questionType, onDelete } = props;
  const [value, setValue] = useState<string>(props.value);
  const [isCorrect, setIsCorrect] = useState<boolean>(props.correct);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (!props.value) {
      setEditMode(true);
    }
    setValue(props.value);
  }, [props.value]);

  function onSave() {
    try {
      props.onSave(value, isCorrect);
      setEditMode(false);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={styles.answer}>
      <div className={styles.wrapper}>
        <span className={styles.order}>{order + 1}.</span>
        {editMode ? (
          <Input
            type="text"
            value={value}
            className={styles.input}
            placeholder="Введите ответ"
            focus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
        ) : (
          <>
            <div className={isCorrect ? styles.correct : ""}>{value}</div>
            <Button
              className={styles.edit}
              variant="icon-edit"
              onClick={() => setEditMode(true)}
            />
            <Button
              className={styles.remove}
              variant="icon-remove"
              onClick={onDelete}
            />
          </>
        )}
      </div>

      {editMode && (
        <>
          {questionType !== "input" && (
            <Input
              type="checkbox"
              variant="checkbox"
              label="правильный ответ"
              checked={isCorrect}
              onChange={() => setIsCorrect(!isCorrect)}
            />
          )}
          <Button className={styles.save} onClick={onSave}>
            Сохранить ответ
          </Button>
        </>
      )}
    </div>
  );
}

export default AnswerForm;
