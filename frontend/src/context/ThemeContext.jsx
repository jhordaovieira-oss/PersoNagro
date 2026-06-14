import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false)

  const toggle = () => setDark(d => !d)

  const theme = {
    dark,
    toggle,
    bg:         dark ? '#141a0e' : '#f5f5f0',
    surface:    dark ? '#1e2614' : '#ffffff',
    surfaceAlt: dark ? '#252d18' : '#f0f0ea',
    border:     dark ? '#2e3a1e' : '#e0e0d8',
    text1:      dark ? '#e8ead4' : '#1a1a10',
    text2:      dark ? '#8a9470' : '#6b7060',
    green:      '#4ade80',
    greenDim:   dark ? '#22542e' : '#dcfce7',
    greenText:  dark ? '#4ade80' : '#15803d',
    amber:      '#fbbf24',
    red:        dark ? '#f87171' : '#dc2626',
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}