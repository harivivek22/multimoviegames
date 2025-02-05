"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"
import { useMovieWordle } from "./useMovieWordle"

const LetterBox = ({ letter, state }: { letter: string; state: string }) => {
  const baseClasses = "w-10 h-10 border-2 flex items-center justify-center font-bold text-lg"
  const stateClasses = {
    correct: "bg-green-500 border-green-600",
    present: "bg-yellow-500 border-yellow-600",
    absent: "bg-gray-300 border-gray-400",
    unattempted: "bg-white border-gray-300",
  }

  return <div className={`${baseClasses} ${stateClasses[state]}`}>{letter}</div>
}

export default function MovieWordlePage() {
  const {
    targetMovie,
    guesses,
    currentGuess,
    setCurrentGuess,
    feedback,
    letterStates,
    gameOver,
    handleGuess,
    resetGame,
  } = useMovieWordle()

  if (!targetMovie) {
    return (
      <div className="min-h-screen bg-[#54CAEC] flex flex-col items-center justify-center">
        <p className="text-xl text-black">Loading movies...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#54CAEC] flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4 text-black text-center">Movie Wordle</h1>
        <p className="text-xl mb-8 text-black text-center">Guess the movie title!</p>

        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-center mb-4">
            {targetMovie.split("").map((_, index) => (
              <LetterBox key={index} letter="_" state="unattempted" />
            ))}
          </div>

          {guesses.map((guess, guessIndex) => (
            <div key={guessIndex} className="flex justify-center mb-2">
              {guess.split("").map((letter, letterIndex) => (
                <LetterBox key={letterIndex} letter={letter} state={letterStates[guessIndex][letterIndex]} />
              ))}
            </div>
          ))}

          <Input
            type="text"
            placeholder="Enter your guess"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
            disabled={gameOver}
            className="w-full"
            maxLength={targetMovie.length}
          />
          <Button
            onClick={handleGuess}
            disabled={gameOver || currentGuess.length !== targetMovie.length}
            className="w-full bg-[#C1272D] text-white hover:bg-red-700"
          >
            Submit Guess
          </Button>
          {gameOver && (
            <Button onClick={resetGame} className="w-full bg-blue-500 text-white hover:bg-blue-600">
              Play Again
            </Button>
          )}
        </div>

        {feedback && <p className="mt-4 text-lg text-black text-center">{feedback}</p>}

        <p className="mt-4 text-black">Attempts: {guesses.length}/6</p>
      </main>
      <Footer />
    </div>
  )
}

