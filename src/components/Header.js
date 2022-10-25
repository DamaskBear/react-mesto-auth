import logo from '../images/logo_mesto.svg';

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип надписью Место"/>
    </header>
  )
}

export default Header;