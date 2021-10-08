import React, { useState } from "react";
import styles from "./LoginForm.module.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { connect } from "react-redux";
import {
  createChangePassowrdRequest,
  createLoginRequest,
  createRegistrationRequest,
  createResetPassowrdRequest,
} from "../../pages/Login/Login.actions";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";

interface LoginFormProps {
  login: (email: string, password: string) => void;
  registration: (email: string, password: string) => void;
  resetPassword: (email: string) => void;
  changePassword: (password: string, id: string) => void;
}

function LoginForm(props: LoginFormProps) {
  const { login, registration, resetPassword, changePassword } = props;
  const isRegistrationPage = useRouteMatch("/registration");
  const isResetPasswordPage = useRouteMatch("/reset-password");
  const isChangePasswordPage = useRouteMatch("/change-password");
  const { id }: any = useParams();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();

  const title = (() => {
    switch (true) {
      case !!isRegistrationPage:
        return "Регистрация";
      case !!isResetPasswordPage || !!isChangePasswordPage:
        return "Восстановление пароля";
      default:
        return "Вход";
    }
  })();

  const submitText = (() => {
    switch (true) {
      case !!isRegistrationPage:
        return "Зарегистрироваться";
      case !!isResetPasswordPage:
        return "Восстановить пароль";
      case !!isChangePasswordPage:
        return "Сменить пароль";
      default:
        return "Войти";
    }
  })();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    switch (true) {
      case !!isRegistrationPage:
        registration(email, password);
        break;
      case !!isResetPasswordPage:
        resetPassword(email);
        break;
      case !!isChangePasswordPage:
        changePassword(password, id);
        break;
      default:
        login(email, password)
        break;
    }
  }

  function onPasswordForgot() {
    history.push("/reset-password");
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.title}>{title}</div>
      <div className={styles.fields}>
        {!isChangePasswordPage && (
          <Input
            type="text"
            value={email}
            name="email"
            className={styles.field}
            placeholder="Email"
            autoFocus={true}
            autoComplete="on"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        )}
        {!isResetPasswordPage && (
          <Input
            type="password"
            value={password}
            className={styles.field}
            placeholder="Пароль"
            autoComplete="on"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        )}
      </div>
      <div className={styles.footer}>
        {!isRegistrationPage && !isResetPasswordPage && !isChangePasswordPage && (
          <Button variant="link" onClick={onPasswordForgot}>
            Забыли пароль
          </Button>
        )}
        <Button type="submit" className={styles.submit}>
          {submitText}
        </Button>
      </div>
    </form>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  login: (email: string, password: string) =>
    dispatch(createLoginRequest(email, password)),
  registration: (email: string, password: string) =>
    dispatch(createRegistrationRequest(email, password)),
  resetPassword: (email: string) => dispatch(createResetPassowrdRequest(email)),
  changePassword: (password: string, id: string) =>
    dispatch(createChangePassowrdRequest(password, id)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
