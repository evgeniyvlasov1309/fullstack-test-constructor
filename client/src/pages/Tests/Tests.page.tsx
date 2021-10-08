import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import { tableDefs } from "./components/TestsTableDefs";
import { deleteTestRequest, fetchTestsRequest } from "./Tests.actions";
import styles from "./Tests.module.scss";
import { testsSelector } from "./Tests.selectors";
import { TestsState } from "./Tests.state";

export interface TestsPageState {
  tests: TestsState;
}

interface TestsPageProps {
  fetchTests: () => void;
  deleteTest: (id: string) => void;
}

function Tests(props: TestsPageProps) {
  const { fetchTests, deleteTest } = props;
  const tableData = useSelector(testsSelector);
  const history = useHistory();

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  function onCreate() {
    history.push('/tests/create');
  }

  function openTest(id: string) {
    history.push(`/tests/${id}`);
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>Мои тесты</div>
        <Button onClick={onCreate}>Создать</Button>
      </div>
      <Table data={tableData} defs={tableDefs({
        deleteTest,
        openTest
      })} />
    </>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchTests: () =>
    dispatch(fetchTestsRequest()),
  deleteTest: (id: string) =>
    dispatch(deleteTestRequest(id)),
});

export default connect(null, mapDispatchToProps)(Tests);
