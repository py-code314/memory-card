import { useState, useEffect } from 'react'
import { ImageList, Image } from './components/ImageList'
import ScoreBoard from './components/ScoreBoard'
import ModalDialog from './components/ModalDialog'
import { shuffleCards } from './utils/randomizeArray'
import rickIcon from './assets/images/icon-rick.svg'
import mortyIcon from './assets/images/icon-morty.svg'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [cardIds, setCardIds] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [showModal, setShowModal] = useState(false)

  // console.log(data)

  useEffect(() => {
    // Add ignore flag and setData(null) - for safety and future proofing
    let ignore = false
    console.log('setData to null')
    setData(null)

    async function fetchData() {
      console.log('isLoading true')
      setIsLoading(true)
      setIsError(false)

      try {
        console.log('fetching data')
        const response = await fetch(
          'https://rickandmortyapi.com/api/character/[1,2,4,5,47,103,118,242,244,331,372,629]'
        )
        // Check response for HTTP errors
        if (!response.ok) {
          throw new Error()
        }
        const data = await response.json()
        if (!ignore) {
          // console.log('setData to data')
          setData(data)
          // console.log('isLoading second time')
          // setIsLoading(false)
        }
      } catch (error) {
        // Catches network errors
        console.error('Error fetching data:', error)
        setIsError(true)
      }
      // console.log('isLoading false')
      setIsLoading(false)
    }

    fetchData()

    // Clean-up function
    return () => {
      ignore = true
    }
  }, [])

  function handleCardClick(e) {
    const cardId = e.currentTarget.id
    shuffleCards(data)

    // console.log(e.currentTarget.id)
    // Track card clicks for scoring
    if (!cardIds.includes(cardId)) {
      setCurrentScore(currentScore + 1)
      setCardIds([...cardIds, cardId])
    } else {
      if (currentScore > bestScore) {
        setBestScore(currentScore)
      }

      setCurrentScore(0)
      setCardIds([])
      setShowModal(true)
    }
  }

  function handleBtnClick() {
    setShowModal(false)
  }

  // TODO: Extract header component
  // TODO: Fix title contrast check
  console.log(isLoading)
  return (
    <>
      <header className="header">
        <img
          className="header__icon"
          src={rickIcon}
          alt=""
          width={70}
          height={70}
        />

        <h1 className="title">
          <span>Rick & Morty</span> <span>Memory Mayhem</span>
        </h1>

        <img
          className="header__icon"
          src={mortyIcon}
          alt=""
          width={70}
          height={70}
        />
      </header>

      <main className="main">
        {showModal && (
          <ModalDialog
            currentScore={currentScore}
            bestScore={bestScore}
            handleClick={handleBtnClick}
          />
        )}
        <ScoreBoard currentScore={currentScore} bestScore={bestScore} />
        <div className="cards">
          {data && shuffleCards(data)}
          <ImageList isLoading={isLoading} isError={isError}>
            {data &&
              data.map((character) => (
                <Image
                  key={character.id}
                  character={character}
                  handleClick={handleCardClick}
                  isLoading={isLoading}
                />
              ))}
          </ImageList>
        </div>
        <div className="footer">
          <p className="footer__text">Wubba lubba dub dub</p>
        </div>
      </main>
    </>
  )
}

export default App
