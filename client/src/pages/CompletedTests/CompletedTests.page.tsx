import React from "react";
import Button from "../../components/Button/Button";
import { ColumnDefinition } from "../../components/Table/contracts/TableDefinition";
import Table from "../../components/Table/Table";
import { TestModel } from "../../models/Test";
import styles from "./CompletedTests.module.scss";

function Tests() {
  const tableData = [
    {
      id: 1,
      name: "Тест 1",
      dateOfCompletion: "03.06.2021",
      result: 1,
    },
    {
      id: 2,
      name: "Тест 2",
      dateOfCompletion: "04.06.2021",
      result: 4,
    },
    {
      id: 3,
      name: "Тест 3",
      dateOfCompletion: "08.09.2021",
      result: 25,
    },
  ];

  function tableDefs(props: any): ColumnDefinition[] {
    return [
      {
        title: "Название",
        field: "name",
      },
      {
        title: "Дата прохождения",
        field: "dateOfCompletion",
      },
      {
        title: "Результат",
        field: "result",
      },
      {
        title: "Действия",
        field: "",
        cssHeaderClass: styles.center,
        cellRenderer: (item: TestModel) => {
          return (
            <div className={styles.actions}>
              <Button onClick={() => {}}>Открыть</Button>
            </div>
          );
        },
      },
    ];
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>Пройденные тесты</div>
      </div>
      <Table data={tableData} defs={tableDefs({})} />
    </>
  );
}

export default Tests;
