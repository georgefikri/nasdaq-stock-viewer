import { useEffect, useState, useTransition, useDeferredValue, useRef } from 'react';
import { useStockStore } from '@/features/stocks/store/useStockStore';

export function useStockGridLogic() {
  const {
    stocks,
    fetchBySearch,
    loading,
    error,
    loadNasdaqTickers,
    loadMoreTickers,
    availableTickers,
    searchResults,
    searchSymbols,
  } = useStockStore();

  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const [isPending, startTransition] = useTransition();
  const hasFetchedRef = useRef(false);
  const initialScrollReached = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    loadNasdaqTickers().then(() => {
      loadUntilScrollable();
    });
  }, []);

  const loadUntilScrollable = async () => {
    let attempts = 0;

    while (document.body.scrollHeight <= window.innerHeight && attempts < 10) {
      await loadMoreTickers();
      attempts++;
      await new Promise((res) => setTimeout(res, 300));
    }

    initialScrollReached.current = true;
  };

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (initialScrollReached.current && nearBottom && !loading && !search) {
        loadMoreTickers();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, search]);

  useEffect(() => {
    const trimmed = deferredSearch.trim();
    if (!trimmed) return;

    const timeout = setTimeout(() => {
      startTransition(() => {
        searchSymbols(trimmed.toUpperCase());
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [deferredSearch]);

  const handleSearchSelect = (symbol: string) => {
    fetchBySearch(symbol);
    useStockStore.setState({ searchResults: [] });
  };

  const handleClearSearch = () => {
    setSearch('');
    useStockStore.setState({ searchResults: [] });
    initialScrollReached.current = false;
    loadUntilScrollable();
  };

  return {
    search,
    setSearch,
    stocks,
    loading,
    error,
    availableTickers,
    searchResults,
    handleSearchSelect,
    handleClearSearch,
    isPending,
  };
}
