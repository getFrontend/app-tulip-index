"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Coffee, ShoppingBag, Utensils, Bus, Film, Book } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import type { LatestPriceData } from "@/lib/types"
import { useTranslation } from "@/lib/i18n/context"

interface PriceComparisonProps {
  data: LatestPriceData
}

interface ItemData {
  name: string;
  price: number;
  icon: React.ElementType;
  color: string;
}

export default function PriceComparison({ data }: PriceComparisonProps) {
  const { t, formatPrice, convertPrice, language } = useTranslation()
  const [tulipCount, setTulipCount] = useState(10)
  const [totalPrice, setTotalPrice] = useState(tulipCount * convertPrice(data.tulipPrice))

  // Update the total price when language (currency) changes
  useEffect(() => {
    setTotalPrice(tulipCount * convertPrice(data.tulipPrice))
  }, [language, tulipCount, data.tulipPrice, convertPrice])

  const items: ItemData[] = [
    {
      name: "coffee",
      price: data.essentialGoods.coffee,
      icon: Coffee,
      color: "bg-amber-100 text-amber-700",
    },
    {
      name: "groceryBag",
      price: data.essentialGoods.groceryBag,
      icon: ShoppingBag,
      color: "bg-green-100 text-green-700",
    },
    {
      name: "lunch",
      price: data.essentialGoods.lunch,
      icon: Utensils,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "busTicket",
      price: data.essentialGoods.busTicket,
      icon: Bus,
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "movieTicket",
      price: data.essentialGoods.movieTicket,
      icon: Film,
      color: "bg-red-100 text-red-700",
    },
    {
      name: "book",
      price: data.essentialGoods.book,
      icon: Book,
      color: "bg-indigo-100 text-indigo-700",
    },
  ]

  const handleSliderChange = (value: number[]) => {
    setTulipCount(value[0])
    setTotalPrice(value[0] * convertPrice(data.tulipPrice))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
            <div className="text-center md:text-left md:w-1/3">
              <h3 className="text-lg font-medium mb-1">{t("comparison.adjustTulips")}</h3>
              <p className="text-muted-foreground text-sm">{t("comparison.seeWhat")}</p>
            </div>
            <div className="w-full md:w-2/3">
              <Slider value={[tulipCount]} min={1} max={100} step={1} onValueChange={handleSliderChange} />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{t("comparison.oneTulip")}</span>
                <span>{t("comparison.hundredTulips")}</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              {t("comparison.withAmount", { amount: formatPrice(tulipCount * data.tulipPrice) })}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {items.map((item, index) => {
              // Convert prices to current currency
              const itemPrice = convertPrice(item.price)
              const quantity = Math.floor(totalPrice / itemPrice)
              
              // Use as() to cast the translation result to string
              const itemName = t(`item.${item.name}` as keyof typeof t)

              return (
                <motion.div
                  key={item.name}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${item.color} mb-3`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{quantity}</div>
                  <div className="text-sm text-muted-foreground">
                    {(() => {
                      // Check if the translation keys exist in the current language
                      const pluralKey = "item." + item.name + ".plural";
                      const singularKey = "item." + item.name + ".singular";
                      
                      // Use the new keys if they're properly translated, otherwise fall back to the old approach
                      if (t(pluralKey as keyof typeof t) !== pluralKey && t(singularKey as keyof typeof t) !== singularKey) {
                        return quantity !== 1 
                          ? t(pluralKey as keyof typeof t)
                          : t(singularKey as keyof typeof t);
                      } else {
                        // We need language here, so it's not unused
                        return language === "en" 
                          ? (quantity !== 1 
                              ? itemName + (item.name === "coffee" ? "" : "s") 
                              : itemName)
                          : itemName;
                      }
                    })()}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

