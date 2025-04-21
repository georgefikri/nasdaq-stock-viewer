import axios, { AxiosError } from 'axios';
import { delay } from '@/lib/utils/delay';
import { TStockData } from '@/types/stocks';

import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from '@/config/finnhub';

export async function fetchStockData(
  symbol: string,
  retries = 2,
  delayMs = 1000
): Promise<TStockData> {
  const url = `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`;

  try {
    const res = await axios.get(url);

    const data = res.data;

    if (!data || data.c === 0) {
      throw new Error('Invalid stock data received');
    }

    return {
      symbol,
      open: data.o,
      close: data.c,
      high: data.h,
      low: data.l,
      volume: 0,
      previousClose: data.pc,
      timestamp: data.t,
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    if (err.response?.status === 429 && retries > 0) {
      await delay(delayMs);
      return fetchStockData(symbol, retries - 1, delayMs * 2);
    }

    const message = err?.response?.data?.message || 'Failed to fetch stock data....';
    throw new Error(message);
  }
}
