import React from "react";
import Loader from "react-loader-spinner";
import styles from "./Loading.module.scss";

function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.title}>Загрузка...</div>
      <Loader
        type="Circles"
        color="sandybrown"
        height={100}
        width={100}
      />
    </div>
  );
}

export default Loading;
