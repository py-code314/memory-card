import '../styles/ImageList.css'

export const ImageList = ({ children }) => {
  return <ul className="characters">{children}</ul>
}

export const Image = ({ character, handleClick }) => {
  return (
    <li className="character">
      <button
        className="character__btn"
        type="button"
        id={character.id}
        onClick={handleClick}>
        <div className="character__image-container">
          <img className="character__image" src={character.image} alt="" />
        </div>
        <p className="character__name">{character.name}</p>
      </button>
    </li>
  )
}
