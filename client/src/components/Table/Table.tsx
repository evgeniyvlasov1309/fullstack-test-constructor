import React from "react";
import TableItem from "./components/TableItem";
import { ColumnDefinition } from "./contracts/TableDefinition";
import styles from "./Table.module.scss";

interface TableProps {
  data: any;
  defs: ColumnDefinition[];
}

function Table(props: TableProps) {
  const { data, defs } = props;
  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div className={styles.row}>
          {defs.map(item => (
            <div className={`${styles.cell}${item.cssHeaderClass ? ` ${item.cssHeaderClass}` : ""}`} key={item.field}>
              {item.title}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.body}>
        {data.map((item: any) => (
          <TableItem data={item} defs={defs} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Table;
