import { FinnhubSearchResult } from '@/types/stocks';
import axios from 'axios';

import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from '@/config/finnhub';

export async function searchSymbols(
  query: string
): Promise<{ symbol: string; description: string }[]> {
  const url = `${FINNHUB_BASE_URL}/search?q=${query}&token=${FINNHUB_API_KEY}`;
  const { data } = await axios.get<{ result: FinnhubSearchResult[] }>(url);

  return data.result
    .filter((item) => item.symbol && item.description)
    .map((item) => ({
      symbol: item.symbol,
      description: item.description,
    }));
}
