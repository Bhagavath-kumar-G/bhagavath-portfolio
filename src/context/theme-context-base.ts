import { createContext } from 'react'

export type Theme = 'dark' | 'light'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isDark: boolean
}

export const THEME_STORAGE_KEY = 'bk_portfolio_theme'

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

