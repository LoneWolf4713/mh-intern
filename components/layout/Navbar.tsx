"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { setupDropdownMotion } from "@/motion/navbar"

const conditions = [
  { title: "Depression", subtext: "63.8% symptoms reduction" },
  { title: "OCD", subtext: "Accelerated symptom reduction" },
  { title: "Anxiety", subtext: "46%+ improvement in 3 weeks" },
  { title: "Postpartum Depression", subtext: "Safe with/without medication" },
  { title: "ADHD", subtext: "34% cognitive boost" },
  { title: "Addiction", subtext: "50% craving reduction" },
]

const howEaseWorks = [
  { title: "tDCS Brain Stimulation", subtext: "CDSCO-approved • Non-Invasive • 20 min sessions" },
  { title: "EEG Brain Monitoring", subtext: "Real-time brain activity • Objective reports" },
  { title: "Cognitive Emotional Training", subtext: "Gamified exercises adaptive difficulty" },
  { title: "tDCS vs rTMS", subtext: "Compare brain stimulation options" },
  { title: "Global tDCS Landscape", subtext: "How EASE stands out" },
]

const forDoctors = [
  { title: "Why EASE for your Clinic", subtext: "90% of doctors see practice boost" },
  { title: "EASE Partner Program", subtext: "" },
  { title: "Clinical Evidence", subtext: "AIIMS • NIMHANS • Research downloads" },
  { title: "EASE in your Practice", subtext: "Setup • Protocols • Patient • Monitoring" },
]

const findADoctor = [
  { title: "Mumbai", subtext: "" },
  { title: "Delhi", subtext: "" },
  { title: "Bengaluru", subtext: "" },
  { title: "Hyderabad", subtext: "" },
  { title: "View all doctors →", subtext: "", grayed: true },
]

const results = [
  { title: "Patient Stories", subtext: "Patient testimonials across all conditions" },
  { title: "Clinical Outcomes", subtext: "10,000+ patients treated" },
  { title: "Doctor Testimonials", subtext: "What psychiatrists say about" },
  { title: "Is EASE for Me?", subtext: "" },
]

const ListItem = ({ title, subtext, grayed, href = "#" }: { title: string; subtext?: string; grayed?: boolean; href?: string }) => {
  return (
    <li className="list-none opacity-0 translate-y-2">
      <a
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50",
          grayed && "opacity-50"
        )}
      >
        <div className="text-sm font-semibold leading-none text-black">{title}</div>
        {subtext && (
          <p className="line-clamp-2 text-xs leading-snug text-slate-500">
            {subtext}
          </p>
        )}
      </a>
    </li>
  )
}

const NavDropdown = ({ title, items, columns = 1, width = "w-[500px]" }: { title: string; items: any[]; columns?: number; width?: string }) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { init, enter, leave } = setupDropdownMotion(dropdownRef)

  useEffect(() => {
    init()
  }, [])

  return (
    <div 
      className="relative flex items-center h-full" 
      onMouseEnter={enter} 
      onMouseLeave={leave}
    >
      <button className="inline-flex h-10 w-max items-center justify-center rounded-2xl bg-transparent px-4 py-2 text-sm font-medium text-black outline-none transition-colors hover:bg-slate-100">
        {title}
        <ChevronDown className="relative top-[1px] ml-1 h-3 w-3" />
      </button>

      <div 
        ref={dropdownRef}
        data-nav="dropdown"
        className="absolute left-1/2 top-full flex -translate-x-1/2 justify-center pt-4 z-50 pointer-events-none"
      >
        <div className={cn("relative mt-1.5 overflow-hidden rounded-2xl bg-white text-black shadow-lg p-2 border border-slate-100", width)}>
          <ul className={cn("grid gap-3", columns > 1 ? `grid-cols-${columns}` : "grid-cols-1")}>
            {items.map((item) => (
              <ListItem key={item.title} title={item.title} subtext={item.subtext} grayed={item.grayed} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logo.svg" alt="Marbles Health" width={24} height={24} />
          <span className="text-lg font-bold text-white font-jakarta">Marbles Health</span>
        </Link>

        <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1 shadow-sm h-12">
          <NavDropdown title="Conditions" items={conditions} columns={2} width="w-[480px]" />
          <NavDropdown title="How EASE works" items={howEaseWorks} width="w-[300px]" />
          <NavDropdown title="For Doctors" items={forDoctors} width="w-[280px]" />
          <NavDropdown title="Find a Doctor" items={findADoctor} width="w-[200px]" />
          <NavDropdown title="Results" items={results} width="w-[280px]" />
          
          <Link href="/blogs" className="group inline-flex h-10 w-max items-center justify-center rounded-2xl bg-transparent px-4 py-2 text-sm font-medium text-black outline-none transition-colors hover:bg-slate-100">
            Blogs
          </Link>
        </div>

        <Button variant="default" className="flex items-center gap-2 rounded-md bg-white text-black hover:bg-white/90">
          Book a Demo
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
