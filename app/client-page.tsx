"use client"

import PriceCalculator from "@/components/price-calculator"
import PriceComparison from "@/components/price-comparison"
import HistoricalTrends from "@/components/historical-trends"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import type { LatestPriceData, HistoricalData } from "@/lib/types"
import { useTranslation } from "react-i18next"

interface ClientPageProps {
  initialData: {
    latest: LatestPriceData
    historical: HistoricalData[]
  }
}

// Remove async and use props instead
export default function ClientPage({ initialData }: ClientPageProps) {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
            <ClientTitle />
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <ClientSubtitle />
          </p>
        </section>

        <section className="mb-16">
          <PriceCalculator data={initialData.latest} />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            <ClientComparisonTitle />
          </h2>
          <PriceComparison data={initialData.latest} />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            <ClientTrendsTitle />
          </h2>
          <HistoricalTrends data={initialData.historical} />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

// Small client components for translated text
function ClientTitle() {
  const { t } = useTranslation()
  return <>{t("home.title")}</>
}

function ClientSubtitle() {
  const { t } = useTranslation()
  return <>{t("home.subtitle")}</>
}

function ClientComparisonTitle() {
  const { t } = useTranslation()
  return <>{t("comparison.title")}</>
}

function ClientTrendsTitle() {
  const { t } = useTranslation()
  return <>{t("trends.title")}</>
}