# 📈 Stock Market Web App – React + TypeScript + Vite

A modern stock viewer application built with **React**, **TypeScript**, and **Vite** that fetches real-time stock data from the **Finnhub API**. It includes live search suggestions, infinite scrolling for NASDAQ tickers, and a clean UI with reusable components and toast notifications.

---

## 🚀 Features

- 🔍 **Search-as-you-type** with suggestions using Finnhub's `/search` endpoint.
- 🧾 **Real-time stock quotes** using `/quote`.
- 🏢 **Initial stock list** based on NASDAQ tickers from `/stock/symbol`.
- 🔄 **Infinite scroll** support: loads more stocks as you scroll.
- 🧠 **Debounced search & caching** to optimize API usage.
- 🍞 **Reusable Toast component** for error handling.
- 💅 Built with **Tailwind CSS** for styling.
- 🧑‍💻 Developer name visible in the footer.
- 🧼 Clean, maintainable, and modular code (hook-based logic separation).
- 🧪 ESLint & strict TypeScript rules configured for quality.

---

## 🧠 Technologies

- React
- TypeScript
- Vite
- Zustand (for state management)
- Axios (for API requests)
- Tailwind CSS (for styles)
- ESLint (with type-checked configuration)
- Finnhub API (for stock data)

---

## 📡 API Integration

All stock data is fetched from [Finnhub.io](https://finnhub.io/docs/api):

| Feature            | Endpoint        |
| ------------------ | --------------- |
| NASDAQ Tickers     | `/stock/symbol` |
| Stock Quote        | `/quote`        |
| Search Suggestions | `/search`       |

---

## 🛠️ Setup Instructions

### 1. Clone the project

```bash
git clone https://github.com/yourusername/stock-market-app.git
cd stock-market-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Set up your environment variables

Create a `.env` file in the root of the project:

```bash
VITE_FINNHUB_API_KEY=your_finnhub_api_key_here
```

> ✅ You can obtain a free API key from [https://finnhub.io](https://finnhub.io)

---

## 🧩 Folder Structure

```
src/
├── components/
│   └── ui/
│       └── Toast.tsx         # Reusable toast notification
├── config/
│   └── finnhub.ts            # Finnhub base URL + env key
├── features/
│   └── stocks/
│       ├── api/              # API logic
│       │   ├── fetchStockData.ts
│       │   ├── fetchNasdaqTickers.ts
│       │   └── searchSymbols.ts
│       ├── components/
│       │   └── StockGrid.tsx # Main UI component
│       └── store/
│           └── useStockStore.ts
├── hooks/
│   └── useStockGridLogic.ts  # All logic abstracted from UI
├── lib/
│   └── utils/
│       └── delay.ts
└── types/
    └── stocks.ts             # Custom types for API responses
```

---

## 🧹 ESLint Configuration

We recommend enabling type-checked ESLint configs for robust code quality:

```ts
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You may also enhance your React linting by installing:

```bash
npm install eslint-plugin-react-x eslint-plugin-react-dom --save-dev
```
