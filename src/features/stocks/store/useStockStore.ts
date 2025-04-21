import { create } from 'zustand';
import { TStockStore } from '@/types/store';
import { fetchMultiple } from './actions/fetchMultiple';
import { fetchBySearch } from './actions/fetchBySearch';
import { loadNasdaqTickers } from './actions/loadNasdaqTickers';
import { loadMoreTickers } from './actions/loadMoreTickers';
import { searchSymbolsAction } from './actions/searchSymbols';

export const useStockStore = create<TStockStore>((set, get) => ({
  stocks: {},
  loading: false,
  error: null,
  availableTickers: [],
  tickerIndex: 0,
  searchResults: [],
  currentSearchSymbol: '',

  setCurrentSearchSymbol: (value) => set({ currentSearchSymbol: value }),

  fetchMultiple: (symbols, delayMs) => fetchMultiple(set, get, symbols, delayMs),
  fetchBySearch: (symbol) => fetchBySearch(set, get, symbol),
  loadNasdaqTickers: () => loadNasdaqTickers(set),
  loadMoreTickers: () => loadMoreTickers(set, get),
  searchSymbols: (query) => searchSymbolsAction(set, query),
}));
