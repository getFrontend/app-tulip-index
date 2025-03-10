import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Tulip Index | Compare Tulip Prices to Essential Goods",
  description: "Analyze tulip prices over the last 20 years and compare their value to essential goods",
}

export default async function Home() {
  return <ClientPage />
}