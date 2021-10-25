import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Question from "../../../components/Question/Question";
import history from "../../../history";
import { QuestionModel } from "../../../models/Question";
import { UserAnswer } from "../../../models/UserAnswer";
import { clearTestRequest } from "../EditTest/EditTest.actions";
import { testSelector } from "../EditTest/EditTest.selectors";
import { fetchTestRequest } from "../EditTest/EditTest.thunks";
import styles from "./ExecuteTest.module.scss";
import { ExecuteTestState } from "./ExecuteTest.state";
import { completeTestRequest } from "./ExecuteTest.thunks";

interface ExecuteTestPageProps {
  fetchTest: (id: string) => void;
  clearTest: () => void;
  completeTest: (id: string, answers: UserAnswer[]) => void;
}

export interface ExecuteTestPageState {
  testDetail: {
    execution: ExecuteTestState;
  };
}

function ExecuteTest(props: ExecuteTestPageProps) {
  const { fetchTest, clearTest, completeTest } = props;
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const test = useSelector(testSelector);
  const params: any = useParams();

  useEffect(() => {
    fetchTest(params.id);
    return () => {
      clearTest();
    };
  }, [fetchTest, clearTest, params]);

  function onExit() {
    history.push("/tests");
  }

  function onComplete() {
    completeTest(test.id, answers);
  }

  function onAnswer(question: QuestionModel, answerId: string, value: string) {
    let filteredAnswers: UserAnswer[] = answers;
    let answersFilter: (
      value: UserAnswer,
      index: number,
      array: UserAnswer[]
    ) => boolean;

    switch (question.type) {
      case "checkbox":
        answersFilter = (value, index, array) => {
          return value.answer !== answerId;
        };
        break;
      default:
        answersFilter = (value, index, array) => {
          return !question.answers.find((ans) => ans.id === value.answer);
        };
        break;
    }

    filteredAnswers = filteredAnswers.filter(answersFilter).concat({
      answer: answerId,
      value,
    } as UserAnswer);

    setAnswers(filteredAnswers);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>{test?.title}</div>

      <div className={styles.content}>
        {test?.questions?.map((question: QuestionModel) => {
          return (
            <Question
              question={question}
              onAnswer={onAnswer}
              key={question.id}
            />
          );
        })}
      </div>

      <div className={styles.buttons}>
        <Button className={styles.button} onClick={onExit} type="button">
          Выйти
        </Button>
        <Button className={styles.button} onClick={onComplete} type="button">
          Завершить
        </Button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchTest: (id: string) => dispatch(fetchTestRequest(id)),
  clearTest: () => dispatch(clearTestRequest()),
  completeTest: (id: string, answers: UserAnswer[]) =>
    dispatch(completeTestRequest(id, answers)),
});

export default connect(null, mapDispatchToProps)(ExecuteTest);
