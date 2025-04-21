import { fetchNasdaqTickers } from '@/features/stocks/api/fetchNasdaqTickers';
import { TStockStore } from '@/types/store';

type Set = (partial: Partial<TStockStore>) => void;

export const loadNasdaqTickers = async (set: Set) => {
  const tickers = await fetchNasdaqTickers();
  set({ availableTickers: tickers });
};
