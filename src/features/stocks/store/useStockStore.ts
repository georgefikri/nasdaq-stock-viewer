import { create } from 'zustand';
import { fetchStockData } from '@/features/stocks/api/fetchStockData';
import { fetchNasdaqTickers } from '@/features/stocks/api/fetchNasdaqTickers';
import { searchSymbols } from '@/features/stocks/api/searchSymbols';
import { delay } from '@/lib/utils/delay';
import { AxiosError } from 'axios';
import type { TStockData } from '@/types/stocks';
import { TStockStore } from '@/types/store';

const stockCache = new Map<string, TStockData>();

export const useStockStore = create<TStockStore>((set, get) => ({
  stocks: {},
  loading: false,
  error: null,
  availableTickers: [],
  tickerIndex: 0,
  searchResults: [],
  currentSearchSymbol: '',

  setCurrentSearchSymbol: (value) => set({ currentSearchSymbol: value }),

  fetchMultiple: async (symbols: string[], delayMs = 2500) => {
    // Prevent fetching if a specific stock is being viewed
    if (get().currentSearchSymbol) return;

    set({ loading: true, error: null });

    for (const symbol of symbols) {
      try {
        if (stockCache.has(symbol)) {
          const current = get().stocks;
          set({ stocks: { ...current, [symbol]: stockCache.get(symbol)! } });
          await delay(500);
          continue;
        }

        const data = await fetchStockData(symbol);
        stockCache.set(symbol, data);
        const current = get().stocks;
        set({ stocks: { ...current, [symbol]: data } });

        await delay(delayMs);
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        const errorMessage =
          err.response?.status === 429
            ? 'Rate limit hit. Please try again later.'
            : err.response?.data?.message || 'Failed to fetch stock data';
        set({ error: errorMessage });

        if (err.response?.status === 429) return;
      }
    }

    set({ loading: false });
  },

  fetchBySearch: async (symbol: string) => {
    const normalizedSymbol = symbol.toUpperCase();

    set({ currentSearchSymbol: normalizedSymbol });

    if (get().stocks[normalizedSymbol]) {
      set({ loading: false });
      return;
    }

    if (stockCache.has(normalizedSymbol)) {
      set({
        stocks: { [normalizedSymbol]: stockCache.get(normalizedSymbol)! },
        loading: false,
      });
      return;
    }

    set({ loading: true, error: null });

    try {
      const data = await fetchStockData(normalizedSymbol);
      stockCache.set(normalizedSymbol, data);

      set({
        stocks: { [normalizedSymbol]: data },
        loading: false,
        searchResults: [],
      });
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage =
        err.response?.data?.message || `Failed to fetch ${normalizedSymbol}`;
      set({ error: errorMessage, loading: false });
    }
  },

  loadNasdaqTickers: async () => {
    const tickers = await fetchNasdaqTickers();
    set({ availableTickers: tickers });
  },

  loadMoreTickers: async () => {
    const { availableTickers, tickerIndex, currentSearchSymbol } = get();
    if (currentSearchSymbol) return;

    const nextBatch = availableTickers.slice(tickerIndex, tickerIndex + 10);
    const nextSymbols = nextBatch.map((t) => t.symbol);
    set({ tickerIndex: tickerIndex + 10 });

    return get().fetchMultiple(nextSymbols, 2000);
  },

  searchSymbols: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }

    try {
      const results = await searchSymbols(query);
      set({ searchResults: results.slice(0, 5) });
    } catch {
      set({ error: 'Failed to fetch stock name', searchResults: [] });
    }
  },
}));
