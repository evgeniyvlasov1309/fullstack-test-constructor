import React from "react";
import { ColumnDefinition } from "../contracts/TableDefinition";
import styles from "../Table.module.scss";

interface TableItemProps {
  data: any;
  defs: ColumnDefinition[];
}

function TableItem(props: TableItemProps) {
  const { data, defs } = props;
  return (
    <div className={styles.row}>
      {defs.map((def: ColumnDefinition, index) => (
        <div className={styles.cell} key={index}>
          {def.cellRenderer ? def.cellRenderer(data) : data[def.field]}
        </div>
      ))}
    </div>
  );
}

export default TableItem;
