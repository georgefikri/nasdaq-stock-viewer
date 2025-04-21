import { useStockGridLogic } from '@/hooks/useStockGridLogic';
import { Spinner } from './ui/Spinner';
import { Toast } from '@/components/ui/Toast';
import { useEffect, useState } from 'react';

export const StockGrid = () => {
  const {
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
  } = useStockGridLogic();

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (error) setShowToast(true);
  }, [error]);

  return (
    <div className="p-6">
      <div className="text-center text-3xl font-bold mb-6">📈 Nasdaq Stocks</div>

      <div className="relative flex justify-center mb-2 w-fit mx-auto min-w-96">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search stock symbol..."
          className="w-full max-w-sm px-4 py-2 bg-gray-700 text-white rounded focus:outline-none pr-10"
        />
        {search && (
          <button
            onClick={handleClearSearch}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-xl font-bold px-2"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {searchResults.length > 0 && (
        <ul className="absolute left-1/2 -translate-x-1/2 z-10 bg-gray-800 text-white rounded shadow mt-1 max-h-60 overflow-y-auto min-w-[300px] w-full max-w-sm">
          {searchResults.map((result) => (
            <li
              key={result.symbol}
              className="px-4 py-2 border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleSearchSelect(result.symbol)}
            >
              <div className="font-semibold">{result.symbol}</div>
              <div className="text-sm text-gray-400">{result.description}</div>
            </li>
          ))}
        </ul>
      )}

      {(loading || isPending) && <Spinner />}
      {showToast && error && (
        <Toast message={error} onClose={() => setShowToast(false)} />
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-5">
        {Object.entries(stocks).map(([symbol, data]) => {
          const ticker = availableTickers.find((t) => t.symbol === symbol);

          return (
            <div
              key={symbol}
              className="border border-white rounded-lg p-4 text-center text-white bg-gray-800"
            >
              <h3 className="text-xl font-bold mb-1">{symbol}</h3>
              {ticker && (
                <p className="text-sm text-gray-400 mb-1">{ticker.description}</p>
              )}
              <p className="text-sm">Open: ${data.open}</p>
              <p className="text-sm">Close: ${data.close}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
