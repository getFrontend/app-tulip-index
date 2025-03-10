"use client"

import { useTranslation } from "@/lib/i18n/context"
import { Badge } from "@/components/ui/badge"

export default function CurrencyDisplay() {
  const { language, t } = useTranslation()

  return (
    <Badge variant="outline" className="ml-2">
      {t("currency.name")}
    </Badge>
  )
}

