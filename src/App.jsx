import { useState, useEffect } from 'react'
import { ImageList, Image } from './components/ImageList'
import Header from './components/Header'
import ScoreBoard from './components/ScoreBoard'
import ModalDialog from './components/ModalDialog'
import { shuffleCards } from './utils/randomizeArray'

import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [cardIds, setCardIds] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Add ignore flag and setData(null) - for safety and future proofing
    let ignore = false
    setData(null)

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

  function handleCardClick(e) {
    const cardId = e.currentTarget.id
    shuffleCards(data)

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

  return (
    <>
      <Header />

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
