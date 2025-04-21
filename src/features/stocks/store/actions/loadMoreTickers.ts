import { TStockStore } from '@/types/store';

type Set = (partial: Partial<TStockStore>) => void;
type Get = () => TStockStore;

export const loadMoreTickers = async (set: Set, get: Get) => {
  const { availableTickers, tickerIndex, currentSearchSymbol } = get();
  if (currentSearchSymbol) return;

  const nextBatch = availableTickers.slice(tickerIndex, tickerIndex + 10);
  const nextSymbols = nextBatch.map((t) => t.symbol);
  set({ tickerIndex: tickerIndex + 10 });

  return get().fetchMultiple(nextSymbols, 2000);
};
