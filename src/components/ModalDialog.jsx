import '../styles/ModalDialog.css'

const ModalDialog = ({ currentScore, bestScore, handleClick }) => {
  return (
    <>
      <div className="backdrop"></div>
      <div className="dialog">
        <h2 className='dialog__title'>Game Over!</h2>
        <p className='dialog__score'>Current Score: {currentScore}</p>
        <p className='dialog__score'>Best Score: {bestScore}</p>
        <button className='dialog__btn' type="button" onClick={handleClick}>
          Restart
        </button>
      </div>
    </>
  )
}
 
export default ModalDialog;