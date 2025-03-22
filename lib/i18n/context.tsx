"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language, type TranslationKey } from "./translations"

// USD to UAH conversion rate
const USD_TO_UAH_RATE = 11 // Approximate rate to make a tulip cost ~60 UAH

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
  formatPrice: (priceUSD: number) => string
  convertPrice: (priceUSD: number) => number
  currencySymbol: string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "uk")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Translation function with parameter support
  // Replace any with proper error type
  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let translation = translations[language][key] || key
  
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{${paramKey}}`, String(paramValue))
      })
    }
  
    return translation
  }

  // Function to convert price from USD to current currency
  const convertPrice = (priceUSD: number): number => {
    if (language === "uk") {
      return priceUSD * USD_TO_UAH_RATE
    }
    return priceUSD
  }

  // Function to format price with currency symbol
  const formatPrice = (priceUSD: number): string => {
    const price = convertPrice(priceUSD)
    if (language === "uk") {
      return `${price.toFixed(2)} ₴`
    }
    return `$${price.toFixed(2)}`
  }

  // Currency symbol for current language
  const currencySymbol = language === "uk" ? "₴" : "$"

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        formatPrice,
        convertPrice,
        currencySymbol,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}

