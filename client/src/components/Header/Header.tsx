import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { isAuthSelector } from "../../pages/Login/Login.selectors";
import Button from "../Button/Button";
import Container from "../Container/Container";
import Menu from "../Menu/Menu";
import styles from "./Header.module.scss";

function Header() {
  const isAuth = useSelector(isAuthSelector);
  const isRegistrationPage = useRouteMatch('/registration');
  const history = useHistory();

  function onClick() {
    history.push(isRegistrationPage ? '/login' : '/registration');
  }

  return (
    <div className={styles.header}>
      <Container>
        <div className={styles.inner}>
          {isAuth ? (
            <Menu />
          ) : (
            <Button className={styles.button} onClick={onClick}>
              {!isRegistrationPage ? 'Регистрация' : 'Вход'}
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Header;
