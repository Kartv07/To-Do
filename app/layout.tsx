"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../Components/Navbar';
import { createContext,useState } from 'react';

const inter = Inter({ subsets: ['latin'] })


interface loginCheck {
  log : boolean | undefined;
  setLog : React.Dispatch<React.SetStateAction<boolean | undefined >> 
  user : string | undefined;
  setUser : React.Dispatch<React.SetStateAction<string | undefined >> 
}
export const AppContext = createContext<loginCheck | undefined > (undefined);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [log, setLog] = useState<boolean | undefined>(true);
  const [user, setUser] = useState<string | undefined>("");
  return (
    <AppContext.Provider value={{log, setLog, user,setUser}} >
    <html lang="en" className='font-serif my-24'>
      <body className={inter.className}>{children}</body>
    </html>
    </AppContext.Provider >
  )
}
