import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { LoginState } from "./Login.state";

export interface LoginPageState {
  login: LoginState;
}

function Login() {
  return <LoginForm />;
}

export default Login;
