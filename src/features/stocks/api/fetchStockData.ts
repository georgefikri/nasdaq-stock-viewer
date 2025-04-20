import axios from 'axios';

const API_KEY = '71x4ABHdRW44oeSDi2BFbCviQK6t3FR6';
const BASE_URL = 'https://api.polygon.io';
const cache = new Map<string, any>();

export async function fetchStockData(symbol: string) {
  if (cache.has(symbol)) return cache.get(symbol);

  const url = `${BASE_URL}/v1/open-close/${symbol}/2023-10-20?adjusted=true&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    cache.set(symbol, response.data);
    return response.data;
  } catch {
    throw new Error('Failed to fetch stock data');
  }
}
