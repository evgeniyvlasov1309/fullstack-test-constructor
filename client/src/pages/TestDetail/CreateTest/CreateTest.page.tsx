import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { createTestRequest } from "./CreateTest.actions";
import styles from "./CreateTest.module.scss";

interface CreateTestPageProps {
  createTest: (title: string) => void;
}

function CreateTest(props: CreateTestPageProps) {
    const { createTest } = props;
    const [title, setTitle] = useState<string>("");

  return (
    <div className={styles.container}>
      <div className={styles.title}>{"Создание нового теста"}</div>
      <Input
        type="text"
        className={styles.input}
        placeholder="Введите название теста"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />

      <Button className={styles.create} onClick={() => createTest(title)}>
        Создать
      </Button>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  createTest: (title: string) => dispatch(createTestRequest(title)),
});

export default connect(null, mapDispatchToProps)(CreateTest);
