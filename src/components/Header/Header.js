import logo from '../../images/logo.svg'

export default function Header() {
  return (
    <header className="header page__header">
      <img src={logo} alt="Логотип" className="header__logo" />
    </header>
  )
}