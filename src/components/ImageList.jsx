export const ImageList = ({children}) => {
  return (<ul className="image-list">
    {children}
  </ul> );
}

// TODO: Remove all button styles with - all:unset
export const Image = ({character, handleClick}) => {
  return (
    <li className="image">
      <button type="button" id={character.id} onClick={handleClick}>
        <img src={character.image} alt="" />
        <p>{character.name}</p>
      </button>
    </li>
  )
}
 
