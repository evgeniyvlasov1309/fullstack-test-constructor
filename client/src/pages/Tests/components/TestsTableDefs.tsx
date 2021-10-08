import Button from "../../../components/Button/Button";
import { ColumnDefinition } from "../../../components/Table/contracts/TableDefinition";
import { TestModel } from "../../../models/Test";
import { dateToFormat } from "../../../utility/utility";
import styles from "../Tests.module.scss";

interface TestsTableDefsProps {
  deleteTest: (id: string) => void;
  openTest: (id: string) => void;
}

export function tableDefs(props: TestsTableDefsProps): ColumnDefinition[] {
  const { deleteTest, openTest } = props;
  return [
    {
      title: "Название",
      field: "title",
    },
    {
      title: "Дата создания",
      field: "creationDate",
      cellRenderer: (item: TestModel) => {
        return dateToFormat(new Date(item.creationDate));
      },
    },
    {
      title: "Автор",
      field: "author",
      cellRenderer: (item: TestModel) => {
        return item.author.email;
      },
    },
    {
      title: "Действия",
      field: "",
      cssHeaderClass: styles.center,
      cellRenderer: (item: TestModel) => {
        return (
          <div className={styles.actions}>
            <Button variant="icon-open" onClick={() => openTest(item.id)}></Button>
            <Button
              variant="icon-remove"
              onClick={() => deleteTest(item.id)}
            ></Button>
          </div>
        );
      },
    },
  ];
}
