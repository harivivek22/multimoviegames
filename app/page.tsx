import { GameOption } from "@/components/game-option"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#54CAEC] text-white flex flex-col">
      <main className="container mx-auto px-4 py-16 flex-grow">
        <h1 className="text-5xl font-bold text-center mb-12 text-black">Movie Games Central</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GameOption
            title="Movie Wordle"
            description="Guess daily movie titles with guided hints."
            href="/movie-wordle"
            bgColor="bg-[#C1272D]"
            hoverColor="hover:bg-game1-hover"
            textColor="text-black"
            hoverTextColor="hover:text-black"
          />
          <GameOption
            title="Order of Movies"
            description="Arrange movies by their release date."
            href="/order-of-movies"
            bgColor="bg-game2-bg"
            hoverColor="hover:bg-game2-hover"
            textColor="text-black"
            hoverTextColor="hover:text-black"
          />
          <GameOption
            title="Six Degrees of Separation"
            description="Connect two actors through their movie roles."
            href="/six-degrees"
            bgColor="bg-game3-bg"
            hoverColor="hover:bg-game3-hover"
            textColor="text-black"
            hoverTextColor="hover:text-white"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

