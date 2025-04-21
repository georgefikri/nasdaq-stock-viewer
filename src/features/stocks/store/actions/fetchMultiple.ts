import { TStockData } from '@/types/stocks';
import { TStockStore } from '@/types/store';
import { AxiosError } from 'axios';
import { delay } from '@/lib/utils/delay';
import { fetchStockData } from '@/features/stocks/api/fetchStockData';

type Set = (partial: Partial<TStockStore>) => void;
type Get = () => TStockStore;

const stockCache = new Map<string, TStockData>();

export const fetchMultiple = async (
  set: Set,
  get: Get,
  symbols: string[],
  delayMs = 2500
) => {
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
};
