"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { HistoricalData } from "@/lib/types"
import { useTranslation } from "@/lib/i18n/context"
import { Chart, ChartContainer } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface HistoricalTrendsProps {
  data: HistoricalData[]
}

export default function HistoricalTrends({ data }: HistoricalTrendsProps) {
  const { t, convertPrice, language, currencySymbol } = useTranslation()
  const [activeTab, setActiveTab] = useState("absolute")
  const [chartData, setChartData] = useState({
    absoluteData: [] as any[],
    relativeData: [] as any[],
    purchasingPowerData: [] as any[],
  })

  // Обновляем данные графиков при изменении языка (валюты)
  useEffect(() => {
    // Format data for absolute price chart
    const absoluteData = data.map((year) => ({
      year: year.year,
      tulip: convertPrice(year.tulipPrice),
      coffee: convertPrice(year.essentialGoods.coffee),
      groceryBag: convertPrice(year.essentialGoods.groceryBag),
      lunch: convertPrice(year.essentialGoods.lunch),
      busTicket: convertPrice(year.essentialGoods.busTicket),
      movieTicket: convertPrice(year.essentialGoods.movieTicket),
      book: convertPrice(year.essentialGoods.book),
    }))

    // Format data for relative price chart (indexed to 2003 = 100)
    const baseYear = data.find((d) => d.year === 2003)
    const relativeData = data.map((year) => ({
      year: year.year,
      tulip: (year.tulipPrice / baseYear!.tulipPrice) * 100,
      coffee: (year.essentialGoods.coffee / baseYear!.essentialGoods.coffee) * 100,
      groceryBag: (year.essentialGoods.groceryBag / baseYear!.essentialGoods.groceryBag) * 100,
      lunch: (year.essentialGoods.lunch / baseYear!.essentialGoods.lunch) * 100,
      busTicket: (year.essentialGoods.busTicket / baseYear!.essentialGoods.busTicket) * 100,
      movieTicket: (year.essentialGoods.movieTicket / baseYear!.essentialGoods.movieTicket) * 100,
      book: (year.essentialGoods.book / baseYear!.essentialGoods.book) * 100,
    }))

    // Format data for tulip purchasing power chart
    const purchasingPowerData = data.map((year) => ({
      year: year.year,
      coffee:
        (baseYear!.tulipPrice / baseYear!.essentialGoods.coffee / (year.tulipPrice / year.essentialGoods.coffee)) * 100,
      groceryBag:
        (baseYear!.tulipPrice /
          baseYear!.essentialGoods.groceryBag /
          (year.tulipPrice / year.essentialGoods.groceryBag)) *
        100,
      lunch:
        (baseYear!.tulipPrice / baseYear!.essentialGoods.lunch / (year.tulipPrice / year.essentialGoods.lunch)) * 100,
      busTicket:
        (baseYear!.tulipPrice /
          baseYear!.essentialGoods.busTicket /
          (year.tulipPrice / year.essentialGoods.busTicket)) *
        100,
      movieTicket:
        (baseYear!.tulipPrice /
          baseYear!.essentialGoods.movieTicket /
          (year.tulipPrice / year.essentialGoods.movieTicket)) *
        100,
      book: (baseYear!.tulipPrice / baseYear!.essentialGoods.book / (year.tulipPrice / year.essentialGoods.book)) * 100,
    }))

    setChartData({ absoluteData, relativeData, purchasingPowerData })
  }, [data, language, convertPrice])

  const chartColors = {
    tulip: "#ec4899",
    coffee: "#d97706",
    groceryBag: "#16a34a",
    lunch: "#2563eb",
    busTicket: "#9333ea",
    movieTicket: "#dc2626",
    book: "#4f46e5",
  }

  // Кастомный компонент для тултипа с поддержкой валюты
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-2 shadow-md">
          <p className="font-medium">{`Year: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${activeTab === "absolute" ? currencySymbol : ""}${entry.value.toFixed(2)}${activeTab !== "absolute" ? "" : ""}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>{t("trends.title")}</CardTitle>
          <CardDescription>{t("trends.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="absolute" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="absolute">{t("trends.absolutePrices")}</TabsTrigger>
              <TabsTrigger value="relative">{t("trends.relativePrices")}</TabsTrigger>
              <TabsTrigger value="purchasing">{t("trends.purchasingPower")}</TabsTrigger>
            </TabsList>

            <TabsContent value="absolute">
              <div className="h-[400px]">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData.absoluteData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="tulip"
                          stroke={chartColors.tulip}
                          strokeWidth={3}
                          dot={{ r: 1 }}
                          activeDot={{ r: 5 }}
                          name={t("site.title")}
                        />
                        <Line type="monotone" dataKey="coffee" stroke={chartColors.coffee} name={t("item.coffee")} />
                        <Line
                          type="monotone"
                          dataKey="groceryBag"
                          stroke={chartColors.groceryBag}
                          name={t("item.groceryBag")}
                        />
                        <Line type="monotone" dataKey="lunch" stroke={chartColors.lunch} name={t("item.lunch")} />
                        <Line
                          type="monotone"
                          dataKey="busTicket"
                          stroke={chartColors.busTicket}
                          name={t("item.busTicket")}
                        />
                        <Line
                          type="monotone"
                          dataKey="movieTicket"
                          stroke={chartColors.movieTicket}
                          name={t("item.movieTicket")}
                        />
                        <Line type="monotone" dataKey="book" stroke={chartColors.book} name={t("item.book")} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </div>
              <div className="text-sm text-muted-foreground mt-4 text-center">{t("trends.absoluteCaption")}</div>
            </TabsContent>

            <TabsContent value="relative">
              <div className="h-[400px]">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData.relativeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="tulip"
                          stroke={chartColors.tulip}
                          strokeWidth={3}
                          dot={{ r: 1 }}
                          activeDot={{ r: 5 }}
                          name={t("site.title")}
                        />
                        <Line type="monotone" dataKey="coffee" stroke={chartColors.coffee} name={t("item.coffee")} />
                        <Line
                          type="monotone"
                          dataKey="groceryBag"
                          stroke={chartColors.groceryBag}
                          name={t("item.groceryBag")}
                        />
                        <Line type="monotone" dataKey="lunch" stroke={chartColors.lunch} name={t("item.lunch")} />
                        <Line
                          type="monotone"
                          dataKey="busTicket"
                          stroke={chartColors.busTicket}
                          name={t("item.busTicket")}
                        />
                        <Line
                          type="monotone"
                          dataKey="movieTicket"
                          stroke={chartColors.movieTicket}
                          name={t("item.movieTicket")}
                        />
                        <Line type="monotone" dataKey="book" stroke={chartColors.book} name={t("item.book")} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </div>
              <div className="text-sm text-muted-foreground mt-4 text-center">{t("trends.relativeCaption")}</div>
            </TabsContent>

            <TabsContent value="purchasing">
              <div className="h-[400px]">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData.purchasingPowerData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="coffee" stroke={chartColors.coffee} name={t("item.coffee")} />
                        <Line
                          type="monotone"
                          dataKey="groceryBag"
                          stroke={chartColors.groceryBag}
                          name={t("item.groceryBag")}
                        />
                        <Line type="monotone" dataKey="lunch" stroke={chartColors.lunch} name={t("item.lunch")} />
                        <Line
                          type="monotone"
                          dataKey="busTicket"
                          stroke={chartColors.busTicket}
                          name={t("item.busTicket")}
                        />
                        <Line
                          type="monotone"
                          dataKey="movieTicket"
                          stroke={chartColors.movieTicket}
                          name={t("item.movieTicket")}
                        />
                        <Line type="monotone" dataKey="book" stroke={chartColors.book} name={t("item.book")} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </div>
              <div className="text-sm text-muted-foreground mt-4 text-center">{t("trends.purchasingCaption")}</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

