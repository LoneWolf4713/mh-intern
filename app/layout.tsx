import type { Metadata } from "next"
import { jakarta, oswald } from "@/lib/fonts"
import { SmoothScroll } from "@/components/layout/SmoothScroll"
import { CustomCursor } from "@/components/ui/CustomCursor"
import "./globals.css"

export const metadata: Metadata = {
  title: "Marbles Health",
  description: "Breakthrough Neuro Psychiatry Care",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${oswald.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-jakarta">
        <SmoothScroll>
           <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
