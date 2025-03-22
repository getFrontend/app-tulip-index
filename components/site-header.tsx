"use client"

import { useTranslation } from "@/lib/i18n/context"
import LanguageSwitcher from "./language-switcher"
import CurrencyDisplay from "./currency-display"
import Image from "next/image"
import { logoImg } from "@/constants"

export default function SiteHeader() {
  const { t } = useTranslation()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={logoImg} alt="Logo Tulip" width={32} height={32} />
          <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
            {t("site.title")}
          </span>
          <CurrencyDisplay />
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-primary">
            {t("nav.home")}
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary">
            {t("nav.about")}
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary">
            {t("nav.methodology")}
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary">
            {t("nav.contact")}
          </a>
          <LanguageSwitcher />
        </nav>
        <div className="md:hidden">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}

