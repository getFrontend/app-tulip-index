"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Flower } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import type { LatestPriceData } from "@/lib/types"
import { useTranslation } from "@/lib/i18n/context"

interface PriceCalculatorProps {
  data: LatestPriceData
}

export default function PriceCalculator({ data }: PriceCalculatorProps) {
  const { t, formatPrice } = useTranslation()
  const [tulipCount, setTulipCount] = useState(10)
  // Remove the unused totalPrice variable
  
  const handleSliderChange = (value: number[]) => {
    setTulipCount(value[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setTulipCount(value)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("calculator.title")}</CardTitle>
        <CardDescription>{t("calculator.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full">
              <Slider value={[tulipCount]} min={1} max={100} step={1} onValueChange={handleSliderChange} />
            </div>
            <div className="flex items-center gap-2">
              <Input type="number" value={tulipCount} onChange={handleInputChange} min={1} max={100} className="w-20" />
              <span>{t("calculator.tulips")}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Flower className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">{t("calculator.tulipPrice")}</div>
                <div className="text-2xl font-bold">{formatPrice(data.tulipPrice)}</div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Flower className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">{t("calculator.tulipCount")}</div>
                <div className="text-2xl font-bold">{tulipCount}</div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center p-6 bg-primary/10 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">{t("calculator.totalValue")}</div>
                <div className="text-3xl font-bold">{formatPrice(tulipCount * data.tulipPrice)}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

