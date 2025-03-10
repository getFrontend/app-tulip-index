import tulipData from "./tulip-data.json"

export async function getTulipData() {
  // In a real app, you might fetch this from an API or database
  // For this example, we're using the imported JSON data

  // Get the latest data (most recent year)
  const latestData = tulipData.historical[tulipData.historical.length - 1]

  return {
    latest: {
      tulipPrice: latestData.tulipPrice,
      essentialGoods: latestData.essentialGoods,
    },
    historical: tulipData.historical,
  }
}

