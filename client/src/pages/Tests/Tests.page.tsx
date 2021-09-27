import React from "react";
import Button from "../../components/Button/Button";
import { ColumnDefinition } from "../../components/Table/contracts/TableDefinition";
import Table from "../../components/Table/Table";
import { Test } from "../../models/Test";
import styles from "./Tests.module.scss";

function Tests() {
  const tableData = [
    {
      id: 1,
      name: "Тест 1",
      createdAt: "03.06.2021",
      amountOfUsers: 5,
    },
    {
      id: 2,
      name: "Тест 2",
      createdAt: "04.06.2021",
      amountOfUsers: 7,
    },
    {
      id: 3,
      name: "Тест 3",
      createdAt: "08.09.2021",
      amountOfUsers: 11,
    },
  ];

  function tableDefs(props: any):ColumnDefinition[] {
    return [
      {
        title: "Название",
        field: "name",
      },
      {
        title: "Дата создания",
        field: "createdAt",
      },
      {
        title: "Кол-во участников",
        field: "amountOfUsers",
      },
      {
        title: "Действия",
        field: "",
        cssHeaderClass: styles.center,
        cellRenderer: (item: Test) => {
          return (
            <div className={styles.actions}>
              <Button variant="icon-open" onClick={() => {}}></Button>
              <Button variant="icon-remove" onClick={() => {}}></Button>
            </div>
          );
        },
      },
    ];
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>Мои тесты</div>
        <Button onClick={() => {}}>Создать</Button>
      </div>
      <Table data={tableData} defs={tableDefs({})} />
    </>
  );
}

export default Tests;
