import type { Metadata } from "next"

// If there are any unused imports, remove them
import ClientPage from "./client-page"
import { getTulipData } from "@/lib/data"

export const metadata: Metadata = {
  title: "Tulip Index | Compare Tulip Prices to Essential Goods",
  description: "Analyze tulip prices over the last 20 years and compare their value to essential goods",
}

export default async function Home() {
  const data = await getTulipData()
  
  return <ClientPage initialData={data} />
}