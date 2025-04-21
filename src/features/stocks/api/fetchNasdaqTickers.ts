import { FinnhubTickerResponse } from '@/types/stocks';
import axios from 'axios';
import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from '@/config/finnhub';

export async function fetchNasdaqTickers(): Promise<
  { symbol: string; description: string }[]
> {
  const url = `${FINNHUB_BASE_URL}/stock/symbol?exchange=US&token=${FINNHUB_API_KEY}`;
  const { data } = await axios.get<FinnhubTickerResponse[]>(url);

  return data
    .filter((item) => item.mic === 'XNAS' && item.description)
    .map((item) => ({
      symbol: item.symbol,
      description: item.description,
    }));
}
