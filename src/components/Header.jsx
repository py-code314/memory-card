import rickIcon from '../assets/images/rick.svg'
import mortyIcon from '../assets/images/morty.svg'
import '../styles/Header.css'

/* A functional component that renders the header of the application */
const Header = () => {
  return (
    <header className="header">
      {/* Rick icon */}
      <img
        className="header__icon"
        src={rickIcon}
        alt=""
        width={70}
        height={70}
      />

      {/* Title */}
      <h1 className="title">
        <span>Rick & Morty</span> <span>Memory Mayhem</span>
      </h1>

      {/* Morty icon */}
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
