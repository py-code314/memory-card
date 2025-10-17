import '../styles/Instructions.css'

const Instructions = () => {
  return (
    <div className="instructions">
      <ul className="instructions__list">
        <li className="instructions__item">Click each card only once</li>
        <li className="instructions__item">
          Avoid clicking the same card twice
        </li>
        <li className="instructions__item">
          Try to click all cards and get the best possible score
        </li>
      </ul>
    </div>
  )
}

export default Instructions
