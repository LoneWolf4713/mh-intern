"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; subtext?: string; grayed?: boolean }
>(({ className, title, subtext, grayed, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none hover:bg-slate-100",
            grayed && "opacity-50",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none text-black">{title}</div>
          {subtext && (
            <p className="line-clamp-2 text-xs leading-snug text-slate-500">
              {subtext}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logo.svg" alt="Marbles Health" width={24} height={24} />
          <span className="text-lg font-bold text-white font-jakarta">Marbles Health</span>
        </Link>

        <div className="rounded-2xl bg-white px-2 py-1 shadow-sm">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-black">Conditions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {conditions.map((item) => (
                      <ListItem key={item.title} title={item.title} subtext={item.subtext} href="#" />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-black">How EASE works</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[450px] md:grid-cols-1 lg:w-[500px]">
                    {howEaseWorks.map((item) => (
                      <ListItem key={item.title} title={item.title} subtext={item.subtext} href="#" />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-black">For Doctors</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[450px] md:grid-cols-1 lg:w-[500px]">
                    {forDoctors.map((item) => (
                      <ListItem key={item.title} title={item.title} subtext={item.subtext} href="#" />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-black">Find a Doctor</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[450px] md:grid-cols-1 lg:w-[500px]">
                    {findADoctor.map((item) => (
                      <ListItem key={item.title} title={item.title} subtext={item.subtext} grayed={item.grayed} href="#" />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-black">Results</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[450px] md:grid-cols-1 lg:w-[500px]">
                    {results.map((item) => (
                      <ListItem key={item.title} title={item.title} subtext={item.subtext} href="#" />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/blogs" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-2xl bg-transparent px-4 py-2 text-sm font-medium text-black outline-none disabled:pointer-events-none disabled:opacity-50">
                    Blogs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Button variant="default" className="flex items-center gap-2 rounded-2xl bg-white text-black">
          Book a Demo
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
