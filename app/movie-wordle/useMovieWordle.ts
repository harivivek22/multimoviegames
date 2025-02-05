import { useState, useEffect } from "react"

type LetterState = "correct" | "present" | "absent" | "unattempted"

export function useMovieWordle() {
  const [movies, setMovies] = useState<string[]>([])
  const [targetMovie, setTargetMovie] = useState("")
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState("")
  const [feedback, setFeedback] = useState("")
  const [letterStates, setLetterStates] = useState<LetterState[][]>([])
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    fetchMovies()
  }, [])

  useEffect(() => {
    if (movies.length > 0) {
      resetGame()
    }
  }, [movies])

  const fetchMovies = async () => {
    try {
      const response = await fetch("/movie_titles.csv")
      const text = await response.text()
      const movieList = text.split("\n").filter((movie) => movie.trim() !== "")
      setMovies(movieList)
    } catch (error) {
      console.error("Error fetching movies:", error)
      setFeedback("Error loading movies. Please try again later.")
    }
  }

  const resetGame = () => {
    const newMovie = movies[Math.floor(Math.random() * movies.length)].toUpperCase()
    setTargetMovie(newMovie)
    setGuesses([])
    setCurrentGuess("")
    setFeedback("")
    setLetterStates([])
    setGameOver(false)
  }

  const handleGuess = () => {
    if (currentGuess.length !== targetMovie.length) {
      setFeedback("Your guess must be the same length as the movie title.")
      return
    }

    const newGuesses = [...guesses, currentGuess]
    setGuesses(newGuesses)

    const newLetterStates = checkGuess(currentGuess)
    setLetterStates([...letterStates, newLetterStates])

    if (currentGuess === targetMovie) {
      setFeedback("Congratulations! You guessed the movie!")
      setGameOver(true)
    } else if (newGuesses.length >= 6) {
      setFeedback(`Game over. The movie was "${targetMovie}".`)
      setGameOver(true)
    } else {
      setFeedback(`Incorrect. You have ${6 - newGuesses.length} guesses left.`)
    }

    setCurrentGuess("")
  }

  const checkGuess = (guess: string): LetterState[] => {
    const result: LetterState[] = new Array(guess.length).fill("absent")
    const targetLetters = targetMovie.split("")

    // First pass: mark correct letters
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === targetMovie[i]) {
        result[i] = "correct"
        targetLetters[i] = null
      }
    }

    // Second pass: mark present letters
    for (let i = 0; i < guess.length; i++) {
      if (result[i] !== "correct" && targetLetters.includes(guess[i])) {
        result[i] = "present"
        targetLetters[targetLetters.indexOf(guess[i])] = null
      }
    }

    return result
  }

  return {
    targetMovie,
    guesses,
    currentGuess,
    setCurrentGuess,
    feedback,
    letterStates,
    gameOver,
    handleGuess,
    resetGame,
  }
}

