'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

export function ThemeProvider({ children }) {
  // Always start with 'light' — matches the server render and avoids hydration mismatch.
  // localStorage is read in useEffect after the client has mounted.
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const stored = localStorage.getItem('vince-theme') || 'light'
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(stored)
    document.documentElement.setAttribute('data-theme', stored)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('vince-theme', next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
