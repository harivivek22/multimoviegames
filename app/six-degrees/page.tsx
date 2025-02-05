import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function SixDegreesPage() {
  return (
    <div className="min-h-screen bg-[#54CAEC] flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-black text-center">Six Degrees of Separation</h1>
        <p className="text-xl mb-8 text-black text-center">Connect two actors through their movie roles.</p>
        <p className="text-xl mb-8 text-black text-center">Game coming soon!</p>
        <Link href="/">
          <Button variant="outline" className="bg-game3-bg text-black hover:bg-game3-hover hover:text-white">
            Back to Home
          </Button>
        </Link>
      </main>
      <Footer />
    </div>
  )
}
