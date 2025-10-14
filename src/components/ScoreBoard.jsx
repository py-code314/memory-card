import '../styles/ScoreBoard.css'

const ScoreBoard = ({ currentScore, bestScore }) => {
  return (
    <div className="score">
      <p className="score__current">
        <span className="score__label">Schmeckles collected: </span>
        <span className="score__number">{currentScore}</span>
      </p>
      <p className="score__best">
        <span className="score__label">Highest dimension jump: </span>
        <span className="score__number">{bestScore}</span>
      </p>
    </div>
  )
}
 
export default ScoreBoard;