"use client"

import { useTranslation } from "@/lib/i18n/context"

export default function SiteFooter() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>{t("footer.rights", { year: currentYear })}</p>
        <p className="mt-1">{t("footer.demo")}</p>
      </div>
    </footer>
  )
}