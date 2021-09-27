import React from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.scss";
import avatarImg from "../../assets/images/avatar.svg";
import { createLogoutRequest } from "../../pages/Login/Login.actions";
import { connect, useSelector } from "react-redux";
import { userSelector } from "../../pages/Login/Login.selectors";

interface MenuProps {
  logout: () => void;
}

function Menu(props: MenuProps) {
  const { logout } = props;
  const { email } = useSelector(userSelector);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {email}
        <img src={avatarImg} alt="avatar" className={styles.img} />
      </div>
      <ul className={styles.list}>
        <li>
          <Link to="/tests" className={styles.link}>
            Тесты
          </Link>
        </li>
        <li>
          <Link to="/tests/completed" className={styles.link}>
            Пройденные
          </Link>
        </li>
        <li>
          <Link to="/login" className={styles.link} onClick={() => logout()}>
            Выйти
          </Link>
        </li>
      </ul>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(createLogoutRequest()),
});

export default connect(null, mapDispatchToProps)(Menu);
