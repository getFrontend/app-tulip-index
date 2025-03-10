import type { Metadata } from "next"
import ClientPage from "./client-page"
import { getTulipData } from "@/lib/data"

export const metadata: Metadata = {
  title: "Tulip Index | Compare Tulip Prices to Essential Goods",
  description: "Analyze tulip prices over the last 20 years and compare their value to essential goods",
}

export default async function Home() {
  // Move data fetching to the Server Component
  const data = await getTulipData()

  // Pass data as props to the Client Component
  return <ClientPage initialData={data} />
}