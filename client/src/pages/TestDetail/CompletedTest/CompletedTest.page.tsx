import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./CompletedTest.module.scss";
import { QuestionModel } from "../../../models/Question";
import Question from "../../../components/Question/Question";
import { clearCompletedTestRequest } from "./CompletedTest.actions";
import { fetchCompletedTestRequest } from "./CompletedTest.thunks";
import { completedTestSelector } from "./CompletedTest.selectors";
import { CompletedTestState } from "./CompletedTest.state";

interface CompletedTestDetailPageProps {
  fetchCompletedTest: (id: string) => void;
  clearCompletedTest: () => void;
}

export interface CompletedTestPageState {
  testDetail: {
    completed: CompletedTestState;
  };
}

function CompletedTest(props: CompletedTestDetailPageProps) {
  const {
    fetchCompletedTest,
    clearCompletedTest,
  } = props;

  const params: any = useParams();
  const completed = useSelector(completedTestSelector);

  useEffect(() => {
    fetchCompletedTest(params.id);
    return () => {
      clearCompletedTest();
    };
  }, [fetchCompletedTest, clearCompletedTest, params]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{completed.test?.title}</div>

      <div className={styles.content}>
        {completed.test?.questions?.map((question: QuestionModel) => {
          return (
            <Question
              question={question}
              userAnswers={completed.userAnswers}
              previewMode
              key={question.id}
            />
          );
        })}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchCompletedTest: (id: string) => dispatch(fetchCompletedTestRequest(id)),
  clearCompletedTest: () => dispatch(clearCompletedTestRequest()),
});

export default connect(null, mapDispatchToProps)(CompletedTest);
