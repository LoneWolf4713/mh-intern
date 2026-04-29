import { Navbar } from "@/components/layout/Navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { SeekSection } from "@/components/sections/SeekSection"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <SeekSection />
    </main>
  )
}
