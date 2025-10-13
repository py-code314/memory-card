import '../styles/ScoreBoard.css'

const ScoreBoard = ({ currentScore, bestScore }) => {
  return (<div className='score'>
    <p className='score__current'>Current Score: {currentScore}</p>
    <p className='score__best'>Best Score: {bestScore}</p>
  </div> );
}
 
export default ScoreBoard;