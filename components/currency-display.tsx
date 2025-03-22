"use client"

import { useTranslation } from "@/lib/i18n/context"
import { Badge } from "@/components/ui/badge"

export default function CurrencyDisplay() {
  // Remove language since it's not used directly in this component
  const { t } = useTranslation()

  return (
    <Badge variant="outline" className="ml-2">
      {t("currency.name")}
    </Badge>
  )
}

