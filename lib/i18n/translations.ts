export const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.methodology": "Methodology",
    "nav.contact": "Contact",

    // Header
    "site.title": "Tulip Index",
    "site.description": "Analyze tulip prices over the last 20 years and compare their value to essential goods",

    // Home page
    "home.title": "The Tulip Index",
    "home.subtitle":
      "Analyze how tulip prices have changed over the last 20 years and compare their value to essential goods.",

    // Price Calculator
    "calculator.title": "Tulip Price Calculator",
    "calculator.description": "Calculate the value of your tulip bouquet and see what else you could buy",
    "calculator.tulipPrice": "Tulip Price (each)",
    "calculator.tulipCount": "Tulip Count",
    "calculator.totalValue": "Total Value",
    "calculator.tulips": "tulips",

    // Price Comparison
    "comparison.title": "What Could Your Tulips Buy?",
    "comparison.adjustTulips": "Adjust Tulip Count",
    "comparison.seeWhat": "See what else you could buy with the same amount",
    "comparison.oneTulip": "1 tulip",
    "comparison.hundredTulips": "100 tulips",
    "comparison.withAmount": "With {amount} you could buy:",

    // Items
    "item.coffee": "Coffee",
    "item.groceryBag": "Grocery Bag",
    "item.lunch": "Lunch",
    "item.busTicket": "Bus Ticket",
    "item.movieTicket": "Movie Ticket",
    "item.book": "Book",

    // Historical Trends
    "trends.title": "Historical Price Trends",
    "trends.subtitle": "See how tulip prices have changed compared to essential goods over the last 20 years",
    "trends.absolutePrices": "Absolute Prices",
    "trends.relativePrices": "Relative Prices",
    "trends.purchasingPower": "Purchasing Power",
    "trends.absoluteCaption": "Absolute prices in USD over time",
    "trends.relativeCaption": "Prices indexed to 2003 = 100",
    "trends.purchasingCaption": "Tulip purchasing power relative to 2003 (100 = same purchasing power)",

    // Footer
    "footer.rights": "© {year} Tulip Index. All rights reserved.",
    "footer.demo": "Data is for demonstration purposes only.",

    // Language
    "language.en": "English",
    "language.uk": "Українська",

    // Currency
    "currency.symbol": "$",
    "currency.name": "USD",
  },
  uk: {
    // Navigation
    "nav.home": "Головна",
    "nav.about": "Про нас",
    "nav.methodology": "Методологія",
    "nav.contact": "Контакти",

    // Header
    "site.title": "Індекс Тюльпанів",
    "site.description":
      "Аналізуйте ціни на тюльпани за останні 20 років та порівнюйте їх вартість з основними товарами",

    // Home page
    "home.title": "Індекс Тюльпанів",
    "home.subtitle":
      "Аналізуйте, як змінювалися ціни на тюльпани за останні 20 років та порівнюйте їх вартість з основними товарами.",

    // Price Calculator
    "calculator.title": "Калькулятор цін на тюльпани",
    "calculator.description": "Розрахуйте вартість вашого букета тюльпанів та подивіться, що ще ви могли б купити",
    "calculator.tulipPrice": "Ціна тюльпана (за штуку)",
    "calculator.tulipCount": "Кількість тюльпанів",
    "calculator.totalValue": "Загальна вартість",
    "calculator.tulips": "тюльпанів",

    // Price Comparison
    "comparison.title": "Що можна купити за ваші тюльпани?",
    "comparison.adjustTulips": "Налаштуйте кількість тюльпанів",
    "comparison.seeWhat": "Подивіться, що ще можна купити за ту ж суму",
    "comparison.oneTulip": "1 тюльпан",
    "comparison.hundredTulips": "100 тюльпанів",
    "comparison.withAmount": "За {amount} ви могли б купити:",

    // Items
    "item.coffee": "Кава",
    "item.groceryBag": "Продуктовий кошик",
    "item.lunch": "Обід",
    "item.busTicket": "Квиток на автобус",
    "item.movieTicket": "Квиток у кіно",
    "item.book": "Книга",

    // Historical Trends
    "trends.title": "Історичні тенденції цін",
    "trends.subtitle": "Подивіться, як змінювалися ціни на тюльпани порівняно з основними товарами за останні 20 років",
    "trends.absolutePrices": "Абсолютні ціни",
    "trends.relativePrices": "Відносні ціни",
    "trends.purchasingPower": "Купівельна спроможність",
    "trends.absoluteCaption": "Абсолютні ціни в гривнях з часом",
    "trends.relativeCaption": "Ціни індексовані до 2003 = 100",
    "trends.purchasingCaption":
      "Купівельна спроможність тюльпанів відносно 2003 року (100 = однакова купівельна спроможність)",

    // Footer
    "footer.rights": "© {year} Індекс Тюльпанів. Усі права захищені.",
    "footer.demo": "Дані наведені лише для демонстрації.",

    // Language
    "language.en": "English",
    "language.uk": "Українська",

    // Currency
    "currency.symbol": "₴",
    "currency.name": "UAH",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en

