import rickIcon from '../assets/images/rick.svg'
import mortyIcon from '../assets/images/morty.svg'
import '../styles/Header.css'

const Header = () => {
  return (
    <header className="header">
      <img
        className="header__icon"
        src={rickIcon}
        alt=""
        width={70}
        height={70}
      />

      <h1 className="title">
        <span>Rick & Morty</span> <span>Memory Mayhem</span>
      </h1>

      <img
        className="header__icon"
        src={mortyIcon}
        alt=""
        width={70}
        height={70}
      />
    </header>
  )
}

export default Header
