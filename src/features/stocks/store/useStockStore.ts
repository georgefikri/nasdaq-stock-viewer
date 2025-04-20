import { create } from 'zustand';
import { fetchStockData } from '@/features/stocks/api/fetchStockData';

interface StockState {
  data: any | null;
  loading: boolean;
  error: string | null;
  fetchStock: (symbol: string) => void;
}

export const useStockStore = create<StockState>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchStock: async (symbol) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchStockData(symbol);
      set({ data, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Something went wrong', loading: false });
    }
  },
}));
