# 📈 Stock Market Web App – React + TypeScript + Vite

A modern stock viewer application built with **React**, **TypeScript**, and **Vite** that fetches real-time stock data from the **Finnhub API**. It includes live search suggestions, infinite scrolling for NASDAQ tickers, graceful error handling, and a clean UI built with reusable components and toast notifications.

> 🌐 Live Demo: [nasdaq-stock-viewer.vercel.app](https://nasdaq-stock-viewer.vercel.app)

---

## 🚀 Features

- 🔍 **Search-as-you-type** with suggestions using Finnhub's `/search` endpoint.
- 📊 **Real-time stock quotes** via `/quote`.
- 🏢 **Initial stock list** based on NASDAQ tickers from `/stock/symbol`.
- 🔄 **Infinite scroll** that loads more stocks as the user scrolls.
- ⚡ **Scroll-aware lazy loading** (stops when scroll is enabled).
- 🧠 **Debounced search input** and **cached results** to reduce API usage.
- 🍞 **Toast-based error handling** for graceful user feedback.
- 📛 **Fallback component** in case of total API failure.
- 💅 Styled with **Tailwind CSS** for simplicity and speed.
- 🧑‍💻 **Developer credit** shown at the bottom of the UI.
- 📦 Clean, modular architecture with hook-based logic separation.
- ✅ Fully type-safe using TypeScript.
- 🧪 ESLint with strict type-checked configuration.

---

## 🧠 Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://github.com/pmndrs/zustand) – State Management
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Finnhub API](https://finnhub.io/docs/api) – Financial data provider
- [ESLint](https://eslint.org/) – Linting & formatting

---

## 📡 API Integration

We use [finnhub.io](https://finnhub.io) to power all backend stock data.

| Purpose              | Endpoint        |
| -------------------- | --------------- |
| NASDAQ Tickers       | `/stock/symbol` |
| Realtime Stock Quote | `/quote`        |
| Symbol Search        | `/search`       |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/georgefikri/nasdaq-stock-viewer.git
cd nasdaq-stock-viewer
```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Add Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FINNHUB_API_KEY=your_finnhub_api_key_here
```

> 📝 You can get your API key from [https://finnhub.io](https://finnhub.io)

---

## 🗂 Folder Structure

```
src/
├── components/
│   └── ui/
│       └── Toast.tsx           # Reusable toast for errors
│       └── Spinner.tsx         # Simple loading spinner
├── config/
│   └── finnhub.ts              # Finnhub base URL + env key
├── features/
│   └── stocks/
│       ├── api/                # API logic
│       │   ├── fetchStockData.ts
│       │   ├── fetchNasdaqTickers.ts
│       │   └── searchSymbols.ts
│       ├── components/
│       │   └── StockGrid.tsx   # UI grid
│       └── store/
│           └── useStockStore.ts
├── hooks/
│   └── useStockGridLogic.ts    # Decoupled hook logic
├── lib/
│   └── utils/
│       └── delay.ts            # Async delay helper
├── types/
│   ├── stocks.ts               # API types
│   └── store.ts                # Zustand store types
```

---

## 🧪 ESLint Setup

To enforce clean, consistent code:

```ts
// eslint.config.js
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

You can also add:

```bash
npm install eslint-plugin-react-x eslint-plugin-react-dom --save-dev
```

---

## 🚀 Deployment (Vercel)

[Vercel](https://vercel.com/) for effortless deployment.

### 🔌 Steps:

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub and import your repo.
3. Add your environment variable:
   - `VITE_FINNHUB_API_KEY=your_finnhub_api_key_here`
4. Click **Deploy**.
5. Your app will be live at:
   ```
   https://nasdaq-stock-viewer.vercel.app/
   ```

> ✅ All future pushes to `main` will trigger auto-deploys!

---

## 👤 Developer Info

> Made by **George Fikri**

Website: [nasdaq-stock-viewer.vercel.app](https://nasdaq-stock-viewer.vercel.app)

---

## 🧯 Error Handling Strategy

- **Toast messages** notify users of API-specific errors like rate limits or missing data.
- **ErrorFallback** component renders a user-friendly message in case the API is fully down (network or 500+ errors).
- **Loading spinner** provides visual feedback during long requests.
