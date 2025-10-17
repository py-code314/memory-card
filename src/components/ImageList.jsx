import '../styles/ImageList.css'

/* A component that displays a list of images */
export const ImageList = ({ children, isError, isLoading }) => {
  return (
    <>
      {/* Show error message upon failure to load images */}
      {isError ? (
        <div className="error">
          <p className="error__text">
            <span>Error loading images.</span>{' '}
            <span>Please try again later...</span>
          </p>
        </div>
      ) : (
        <ul className="characters">
          {/* Show loading spinner while images are loading */}
          {isLoading && (
            <div className="loading">
              <div className="loading__spinner"></div>
            </div>
          )}
          {children}
        </ul>
      )}
    </>
  )
}

export const Image = ({ character, handleClick }) => {
  return (
    <>
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
    </>
  )
}
