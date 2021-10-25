import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Table from "../../components/Table/Table";
import styles from "./CompletedTests.module.scss";
import { completedTestsSelector } from "./CompletedTests.selectors";
import { CompletedTestsState } from "./CompletedTests.state";
import { fetchCompletedTestsRequest } from "./CompletedTests.thunks";
import { tableDefs } from "./components/CompletedTestsTableDefs";

export interface CompletedTestsPageState {
  completedTests: CompletedTestsState;
}

interface CompletedTestsPageProps {
  fetchCompletedTests: () => void;
}

function CompletedTests(props: CompletedTestsPageProps) {
  const { fetchCompletedTests } = props;
  const tableData = useSelector(completedTestsSelector);
  const history = useHistory();

  useEffect(() => {
    fetchCompletedTests();
  }, [fetchCompletedTests]);

  function openTest(id: string) {
    history.push(`/tests/completed/${id}`);
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>Пройденные тесты</div>
      </div>
      <Table data={tableData} defs={tableDefs({ openTest })} />
    </>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchCompletedTests: () => dispatch(fetchCompletedTestsRequest()),
});

export default connect(null, mapDispatchToProps)(CompletedTests);
