import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Container from "../components/Container/Container";
import Header from "../components/Header/Header";
import Tests from "./Tests/Tests.page";
import Login from "./Login/Login.page";
import TestDetail from "./TestDetail/TestDetail.page";
import CompletedTests from "./CompletedTests/CompletedTests.page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./Login/Login.actions";
import { isAuthSelector } from "./Login/Login.selectors";

function Root() {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);

  function unauthMiddleware(component: React.ReactFragment) {
    return () =>
      isAuth ? (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      ) : (
        component
      );
  }

  function authMiddleware(component: React.ReactFragment) {
    return () =>
      isAuth ? (
        component
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      );
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Header />
        <Container>
          <Switch>
            <Route
              exact
              path="/login"
              render={unauthMiddleware(<Login />)}
            />
            <Route
              exact
              path="/registration"
              render={unauthMiddleware(<Login />)}
            />
            <Route
              exact
              path="/reset-password"
              render={unauthMiddleware(<Login />)}
            />
            <Route
              exact
              path="/change-password/:id"
              render={unauthMiddleware(<Login />)}
            />
            <Route exact render={authMiddleware(<Tests />)} path="/" />
            <Route
              exact
              render={authMiddleware(<CompletedTests />)}
              path="/tests/completed"
            />
            <Route
              exact
              render={authMiddleware(<TestDetail />)}
              path="/tests/:id"
            />
            <Route exact render={authMiddleware(<Tests />)} path="/tests" />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default Root;
