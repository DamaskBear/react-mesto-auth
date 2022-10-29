import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { initialValues } from "../utils/constants";

function Login(props) {
  const [loginData, setLoginData] = useState(initialValues);

  useEffect(() => {
    setLoginData(initialValues);
  }, []);

  const handleChangeInput = (evt) => {
    const { name, value } = evt.target;

    setLoginData((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onLogin(loginData);
  };

  return (
    <div className="auth">
      <Link to="/sign-up" className="auth__btn">
        Регистрация
      </Link>
      <h2 className="auth__title">Вход</h2>
      <form action="#" className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <input
            type="email"
            name="email"
            className="auth__input"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChangeInput}
          />
          <input
            type="password"
            name="password"
            className="auth__input"
            placeholder="Пароль"
            value={loginData.password}
            onChange={handleChangeInput}
          />
        </fieldset>
        <button className="auth__submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
