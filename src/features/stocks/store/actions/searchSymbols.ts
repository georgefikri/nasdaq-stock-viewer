import { searchSymbols } from '@/features/stocks/api/searchSymbols';
import { TStockStore } from '@/types/store';

type Set = (partial: Partial<TStockStore>) => void;

export const searchSymbolsAction = async (set: Set, query: string) => {
  if (!query.trim()) {
    set({ searchResults: [], currentSearchSymbol: '' });
    return;
  }

  try {
    const results = await searchSymbols(query);
    set({ searchResults: results.slice(0, 5) });
  } catch {
    set({ error: 'Failed to fetch stock name', searchResults: [] });
  }
};
