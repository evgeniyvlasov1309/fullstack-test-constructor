import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router";
import Container from "../components/Container/Container";
import Header from "../components/Header/Header";
import Tests from "./Tests/Tests.page";
import Login from "./Login/Login.page";
import CompletedTests from "./CompletedTests/CompletedTests.page";
import { useDispatch, useSelector } from "react-redux";
import { createLoginRequestError } from "./Login/Login.actions";
import { isAuthLoading, isAuthSelector } from "./Login/Login.selectors";
import history from "../history";
import Loading from "../components/Loading/Loading";
import EditTestPage from "./TestDetail/EditTest/EditTest.page";
import CreateTestPage from "./TestDetail/CreateTest/CreateTest.page";
import { checkAuth } from "./TestDetail/EditTest/EditTest.thunks";
import ExecuteTestPage from "./TestDetail/ExecuteTest/ExecuteTest.page";
import CompletedTestPage from "./TestDetail/CompletedTest/CompletedTest.page";

function Root() {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const loading = useSelector(isAuthLoading);

  function authMiddleware(component: React.ReactFragment) {
    return () => (isAuth === false ? <Login/> : component);
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    } else {
      dispatch(createLoginRequestError());
    }
  }, [dispatch]);

  return (
    <Router history={history}>
      <div className="app">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Header />
            <Container>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Login} />
                <Route exact path="/reset-password" component={Login} />
                <Route exact path="/change-password/:id" component={Login} />
                <Route exact render={authMiddleware(<Tests />)} path="/" />
                <Route
                  exact
                  render={authMiddleware(<CompletedTests />)}
                  path="/tests/completed"
                />
                <Route
                  exact
                  render={authMiddleware(<CompletedTestPage />)}
                  path="/tests/completed/:id"
                />
                <Route
                  exact
                  render={authMiddleware(<CreateTestPage />)}
                  path="/tests/create"
                />
                <Route
                  exact
                  render={authMiddleware(<EditTestPage />)}
                  path="/tests/:id"
                />
                 <Route
                  exact
                  render={authMiddleware(<ExecuteTestPage />)}
                  path="/tests/:id/execute"
                />
                <Route exact render={authMiddleware(<Tests />)} path="/tests" />
              </Switch>
            </Container>
          </>
        )}
      </div>
    </Router>
  );
}

export default Root;
