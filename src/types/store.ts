import { TStockData } from './stocks';

type TTicker = {
  symbol: string;
  description: string;
};

export type TStockStore = {
  stocks: Record<string, TStockData>;
  loading: boolean;
  error: string | null;
  availableTickers: TTicker[];
  tickerIndex: number;
  searchResults: TTicker[];
  currentSearchSymbol: string;
  setCurrentSearchSymbol: (value: string) => void;
  fetchMultiple: (symbols: string[], delayMs?: number) => void;
  fetchBySearch: (symbol: string) => void;
  loadNasdaqTickers: () => Promise<void>;
  loadMoreTickers: () => void;
  searchSymbols: (query: string) => Promise<void>;
};
