import { StockViewer } from '@/features/stocks/components/StockViewer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-center text-3xl font-bold py-6">📈 Stock Market Viewer</h1>
      <StockViewer />
    </div>
  );
}

export default App;
