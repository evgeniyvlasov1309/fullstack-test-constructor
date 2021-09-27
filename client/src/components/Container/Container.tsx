import React from "react";
import styles from "./Container.module.scss";

interface ContainerProps {
  children: React.ReactFragment;
}

function Container(props: ContainerProps) {
  const { children } = props;
  return <div className={styles.container}>{children}</div>;
}

export default Container;
