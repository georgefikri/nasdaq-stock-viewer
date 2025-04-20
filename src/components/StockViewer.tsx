import { useStockStore } from '@/features/stocks/store/useStockStore';

export const StockViewer = () => {
  const { data, loading, error, fetchStock } = useStockStore();

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Enter stock symbol (e.g., AAPL)"
        onKeyDown={(e) => {
          if (e.key === 'Enter')
            fetchStock((e.target as HTMLInputElement).value.toUpperCase());
        }}
        className="border p-2 w-full mb-4"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-bold">{data.symbol}</h2>
          <p>Open: ${data.open}</p>
          <p>Close: ${data.close}</p>
          <p>Volume: {data.volume}</p>
        </div>
      )}
    </div>
  );
};
