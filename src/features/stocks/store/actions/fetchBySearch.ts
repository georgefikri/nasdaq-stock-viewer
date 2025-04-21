import { fetchStockData } from '@/features/stocks/api/fetchStockData';
import { TStockStore } from '@/types/store';
import { AxiosError } from 'axios';
import { TStockData } from '@/types/stocks';

type Set = (partial: Partial<TStockStore>) => void;
type Get = () => TStockStore;

const stockCache = new Map<string, TStockData>();

export const fetchBySearch = async (set: Set, get: Get, symbol: string) => {
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
};
