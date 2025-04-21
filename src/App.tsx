import { StockGrid } from '@/components/StockGrid';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-7xl mx-auto">
        <StockGrid />
      </main>
      <footer className="text-center text-sm text-gray-500 py-4 border-t border-gray-700">
        Developed by George Fikri
      </footer>
    </div>
  );
}

export default App;
