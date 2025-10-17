import '../styles/ModalDialog.css'

/* A modal dialog component that displays a game over message */
const ModalDialog = ({ currentScore, bestScore, handleClick }) => {
  const winner = currentScore === 12
  return (
    <>
      <div className="backdrop"></div>
      <div className="dialog">
        {winner ? (
          <h2 className="dialog__title">You won!</h2>
        ) : (
          <h2 className="dialog__title">Game Over!</h2>
        )}
        <p className="dialog__score">Current Score: {currentScore}</p>
        <p className="dialog__score">Best Score: {bestScore}</p>
        <button className="dialog__btn" type="button" onClick={handleClick}>
          Restart
        </button>
      </div>
    </>
  )
}

export default ModalDialog
