import React, { useEffect, useState } from "react";
import Button from "../../../../../components/Button/Button";
import Input from "../../../../../components/Input/Input";
import { AnswerModel } from "../../../../../models/Answer";
import AnswerForm from "../AnswerForm/AnswerForm";
import styles from "./QuestionForm.module.scss";

interface QuestionFormProps {
  id: string;
  type: string;
  order: number;
  description: string;
  answers: AnswerModel[];
  onSave: (id: string, type: string, order: number, description: string, answers: AnswerModel[]) => void;
}

function QuestionForm(props: QuestionFormProps) {
  const { id, order, onSave } = props;
  const [description, setDescription] = useState<string>(props.description);
  const [type, setType] = useState<string>(props.type);
  const [answers, setAnswers] = useState<AnswerModel[]>(props.answers);

  function onAddAnswer() {
    setAnswers([...answers, {
      value: "",
      correct: false,
    } as AnswerModel]);
  }

  useEffect(() => {
    if (type === "input") {
      setAnswers([
        {
          value: "",
          correct: false,
        } as AnswerModel,
      ]);
    }
  }, [type]);

  function save() {
    onSave(id, type, order, description, answers);
  }

  function onAnswerSave(answer: AnswerModel, value: string, correct: boolean) {
    answer.value = value;
    answer.correct = correct;
  }

  function onDeleteAnswer(removedAnswer: AnswerModel) {
    setAnswers(answers.filter(answer => answer !== removedAnswer));
  }

  return (
    <div className={styles.form}>
      <div className={styles.title}>Добавить вопрос</div>
      <Input
        type="text"
        value={description}
        className={styles.description}
        placeholder="Введите описание вопроса"
        focus
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
      />
      <div className={styles["types-label"]}>Выберите тип вопроса:</div>
      <div className={styles.types}>
        <Input
          type="radio"
          name="question-type"
          variant="radio"
          label="одиночный выбор"
          checked={type === "radio"}
          onChange={() => setType("radio")}
        />
        <Input
          type="radio"
          name="question-type"
          variant="radio"
          label="множественный выбор"
          checked={type === "checkbox"}
          onChange={() => setType("checkbox")}
        />
        <Input
          type="radio"
          name="question-type"
          variant="radio"
          label="текстовое поле"
          checked={type === "input"}
          onChange={() => setType("input")}
        />
      </div>

      <div className={styles.answers}>
        {answers.map((answer, index) => {
          return (
            <AnswerForm
              order={index}
              questionType={type}
              value={answer.value}
              correct={answer.correct}
              key={index}
              onDelete={() => { console.log(answer);
               onDeleteAnswer(answer) }}
              onSave={(value, correct) => onAnswerSave(answer, value, correct)}
            />
          );
        })}
      </div>

      {type !== "input" && (
        <Button
          type="button"
          onClick={onAddAnswer}
        >
          Добавить ответ
        </Button>
      )}
      <Button type="button" className={styles.save} onClick={save}>
        Сохранить
      </Button>
    </div>
  );
}

export default QuestionForm;
