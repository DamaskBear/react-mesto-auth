import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {initialValues} from '../utils/utils';

function Register(props) {
  const [userData, setUserData] = useState(initialValues);

  useEffect(() => {
    setUserData(initialValues);
  }, []);


  const handleChangeInput = (evt) => {
    const { name, value } = evt.target;
    
    setUserData((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onRegister(userData);
  };


  return (
    <div className="auth">
      <Link to="sign-in" className="auth__btn">Войти</Link>
      <h2 className="auth__title">Регистрация</h2>
      <form action="#" className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <input
            type="email"
            name="email"
            className="auth__input"
            placeholder="Email"
            value={userData.email}
            onChange={handleChangeInput}
          />
          <input
            type="password"
            name="password"
            className="auth__input"
            placeholder="Пароль"
            value={userData.password}
            onChange={handleChangeInput}
          />
        </fieldset>
        <button type="submit" className="auth__submit">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;