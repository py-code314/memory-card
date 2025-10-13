import { useState, useEffect } from 'react'
import { ImageList, Image } from './components/ImageList'
import ScoreBoard from './components/ScoreBoard'
import { shuffleCards } from './utils/randomizeArray'

import './App.css'

function App() {
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [cardIds, setCardIds] = useState([])
  // TODO: useReducer for state

  // console.log(data)

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
        // Check response for HTTP errors
        if (!response.ok) {
          throw new Error()
        }
        const data = await response.json()
        if (!ignore) {
          setData(data)
        }
      } catch (error) {
        // Catches network errors
        console.error('Error fetching data:', error)
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()

    // Clean-up function
    return () => {
      ignore = true
    }
  }, [])

  function handleClick(e) {
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
    }
  }

  return (
    <>
      <h1>Memory Game</h1>
      <ScoreBoard currentScore={currentScore} bestScore={bestScore} />
      <div>
        {isLoading && <p>...Loading</p>}
        {isError && <p>Error</p>}
        {data && shuffleCards(data)}

        <ImageList>
          {data &&
            data.map((character) => (
              <Image
                key={character.id}
                character={character}
                handleClick={handleClick}
              />
            ))}
        </ImageList>
      </div>
    </>
  )
}

export default App
