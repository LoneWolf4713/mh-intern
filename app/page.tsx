import { Navbar } from "@/components/layout/Navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { SeekSection } from "@/components/sections/SeekSection"
import { StatementSection } from "@/components/sections/StatementSection"
import { ConditionsSection } from "@/components/sections/ConditionsSection"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      <Navbar />
      <HeroSection />
      <SeekSection />
      <StatementSection />
      <ConditionsSection />
    </main>
  )
}