import Button from "../../../components/Button/Button";
import { ColumnDefinition } from "../../../components/Table/contracts/TableDefinition";
import { CompletedTestModel } from "../../../models/CompletedTest";
import { dateToFormat } from "../../../utility/utility";
import styles from "../CompletedTests.module.scss";

interface TestsTableDefsProps {
  openTest: (id: string) => void;
}

export function tableDefs(props: TestsTableDefsProps): ColumnDefinition[] {
  const { openTest } = props;
  return [
    {
      title: "Название",
      field: "title",
      cellRenderer: (item: CompletedTestModel) => {
        return item.test.title;
      },
    },
    {
      title: "Дата прохождения",
      field: "completionDate",
      cellRenderer: (item: CompletedTestModel) => {
        return dateToFormat(new Date(item.completionDate));
      },
    },
    {
      title: "Результат",
      field: "",
      cellRenderer: (item: CompletedTestModel) => {
        return `${item.right}/${item.right + item.missed}`;
      },
    },
    {
      title: "Действия",
      field: "",
      cssHeaderClass: styles.center,
      cellRenderer: (item: CompletedTestModel) => {
        return (
          <div className={styles.actions}>
            <Button onClick={() => openTest(item.id)}>Открыть</Button>
          </div>
        );
      },
    },
  ];
}
