import { useState, useEffect } from 'react'
import { ImageList, Image } from './components/ImageList'
import Header from './components/Header'
import ScoreBoard from './components/ScoreBoard'
import Instructions from './components/Instructions'
import ModalDialog from './components/ModalDialog'
import { shuffleCards } from './utils/randomizeArray'

import './App.css'

/* App component - main component for the application */
function App() {
  /* State variables */
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [cardIds, setCardIds] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [showModal, setShowModal] = useState(false)

  /* Fetch data from API */
  useEffect(() => {
    // Add ignore flag and setData(null) - for safety and future proofing
    let ignore = false
    setData(null)

    /* Fetches data from the Rick and Morty API */
    async function fetchData() {
      setIsLoading(true)
      setIsError(false)

      try {
        const response = await fetch(
          'https://rickandmortyapi.com/api/character/[1,2,4,5,47,103,118,242,244,331,372,629]'
        )

        if (!response.ok) {
          throw new Error('HTTP error')
        }

        const characters = await response.json()
        if (!ignore) {
          setData(shuffleCards(characters))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Clean-up function
    return () => {
      ignore = true
    }
  }, [])

  /* Function to shuffle the cards and update the score */
  function handleCardClick(e) {
    const cardId = e.currentTarget.id
    shuffleCards(data)

    // Track card clicks for scoring
    if (cardIds.includes(cardId)) {
      if (currentScore > bestScore) {
        setBestScore(currentScore)
      }

      setShowModal(true)
    } else {
      // Click on last card
      if (cardIds.length === 11) {
        setCurrentScore(() => currentScore + 1)
        setBestScore(() => currentScore + 1)
        setShowModal(true)
      } else {
        setCurrentScore(() => currentScore + 1)
        setCardIds([...cardIds, cardId])
      }
    }
  }

  /* Hide modal on Restart button click */
  function handleBtnClick() {
    setCurrentScore(0)
    setCardIds([])
    setShowModal(false)
  }

  return (
    <>
      <Header />

      <main className="main">
        {/* Show modal if user clicks on wrong card */}
        {showModal && (
          <ModalDialog
            currentScore={currentScore}
            bestScore={bestScore}
            handleClick={handleBtnClick}
          />
        )}
        <ScoreBoard currentScore={currentScore} bestScore={bestScore} />
        <Instructions />
        <div className="cards">
          <ImageList isLoading={isLoading} isError={isError}>
            {/* Loop through data and render Image component for each character */}
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
        {/* Footer */}
        <div className="footer">
          <p className="footer__text">Wubba lubba dub dub</p>
        </div>
      </main>
    </>
  )
}

export default App
