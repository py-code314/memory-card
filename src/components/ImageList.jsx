export const ImageList = ({children}) => {
  return (<ul className="image-list">
    {children}
  </ul> );
}

// TODO: Remove all button styles with - all:unset
export const Image = ({character}) => {
  return (
    <li className="image">
      <button type="button">
        <img src={character.image} alt="" />
        <p>{character.name}</p>
      </button>
    </li>
  )
}
 
