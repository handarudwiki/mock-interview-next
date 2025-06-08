import { Metadata } from "next";
import "./globals.css";
import {Mona_Sans} from "next/font/google";
import { Toaster } from "sonner";

const monasans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
})

export const metadata:Metadata = {
  title: "DwiInterview",
  description: "AI Powered Interview Preparation Platform",
}

export default function RootLayout({
  children
}:Readonly<{ children: React.ReactNode }>) {
 return (
   <html lang="en" className="dark">
    <body className={`${monasans.className} antialiased pattern`}>
      {children}
      <Toaster/>
    </body>
  </html>
 )
}