export type TStockData = {
  symbol: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  previousClose: number;
  timestamp: number;
};

export type FinnhubTickerResponse = {
  symbol: string;
  description: string;
  mic: string;
  type: string;
  currency: string;
  displaySymbol: string;
};

export type FinnhubSearchResult = {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
};
