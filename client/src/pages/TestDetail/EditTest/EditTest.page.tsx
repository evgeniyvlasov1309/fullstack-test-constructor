import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearTestRequest,
  createQuestionRequest,
  deleteQuestionRequest,
  fetchTestRequest,
  updateQuestionRequest,
} from "./EditTest.actions";
import styles from "./EditTest.module.scss";
import { QuestionModel } from "../../../models/Question";
import Button from "../../../components/Button/Button";
import Question from "../../../components/Question/Question";
import Modal from "../../../components/Modal/Modal";
import QuestionForm from "./components/QuestionForm/QuestionForm";
import { EditTestState } from "./EditTest.state";
import { AnswerModel } from "../../../models/Answer";
import { testSelector } from "./EditTest.selectors";

interface TestDetailPageProps {
  fetchTest: (id: string) => void;
  clearTest: () => void;
  createQuestion: (
    type: string,
    order: number,
    description: string,
    answers: AnswerModel[]
  ) => void;
  updateQuestion: (
    id: string,
    type: string,
    order: number,
    description: string,
    answers: AnswerModel[]
  ) => void;
  deleteQuestion: (id: string) => void;
}

export interface EditTestPageState {
  testDetail: {
    edit: EditTestState;
  };
}

function EditTest(props: TestDetailPageProps) {
  const {
    fetchTest,
    clearTest,
    updateQuestion,
    createQuestion,
    deleteQuestion,
  } = props;

  const params: any = useParams();
  const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionModel>(
    {} as QuestionModel
  );

  const test = useSelector(testSelector);

  useEffect(() => {
    fetchTest(params.id);
    return () => {
      clearTest();
    };
  }, [fetchTest, clearTest, params]);

  function onEditQuestion(question: QuestionModel) {
    setCurrentQuestion(question);
    setShowQuestionModal(true);
  }

  function onDelete(id: string) {
    deleteQuestion(id);
  }

  function onAddQuestion() {
    setCurrentQuestion({
      id: "",
      type: "radio",
      order: test.questions.length,
      description: "",
      answers: [],
    });
    setShowQuestionModal(true);
  }

  function onSave(
    id: string,
    type: string,
    order: number,
    description: string,
    answers: AnswerModel[]
  ) {
    if (id) {
      updateQuestion(id, type, order, description, answers);
    } else {
      createQuestion(type, order, description, answers);
    }
    setShowQuestionModal(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>{test?.title}</div>

      <div className={styles.content}>
        {test?.questions?.map((question: QuestionModel) => {
          return (
            <Question
              question={question}
              onEdit={() => onEditQuestion(question)}
              onDelete={onDelete}
              key={question.id}
            />
          );
        })}
        <Button
          className={styles.add}
          variant="icon-add"
          onClick={onAddQuestion}
        />
      </div>

      <Modal
        open={showQuestionModal}
        onClose={() => setShowQuestionModal(false)}
      >
        <QuestionForm {...currentQuestion} onSave={onSave} />
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchTest: (id: string) => dispatch(fetchTestRequest(id)),
  clearTest: () => dispatch(clearTestRequest()),
  createQuestion: (
    type: string,
    order: number,
    description: string,
    answers: AnswerModel[]
  ) => dispatch(createQuestionRequest(type, order, description, answers)),
  updateQuestion: (
    id: string,
    type: string,
    order: number,
    description: string,
    answers: AnswerModel[]
  ) => dispatch(updateQuestionRequest(id, type, order, description, answers)),
  deleteQuestion: (id: string) => dispatch(deleteQuestionRequest(id)),
});

export default connect(null, mapDispatchToProps)(EditTest);
