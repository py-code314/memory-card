import '../styles/ImageList.css';

export const ImageList = ({ children }) => {
  return (<ul className="characters">
    {children}
  </ul> );
}

export const Image = ({character, handleClick}) => {
  return (
    <li className="character">
      <button className='character__btn' type="button" id={character.id} onClick={handleClick}>
        <img src={character.image} alt="" />
        <p className='character__name'>{character.name}</p>
      </button>
    </li>
  )
}
 
