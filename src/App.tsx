import { BrowserRouter } from 'react-router-dom';
import { Header } from '@/components/layout';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* White Header variant (for Landing page) */}
        <Header variant="white" />

        {/* Blue Header variant (for Search page) - shown below for testing */}
        <Header variant="blue" showFlagSelector />

        {/* Main content placeholder */}
        <main className="flex-1 bg-lingxm-body">
          <div className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-center text-lingxm-blue mb-4">
                LingXM-Panos
              </h1>
              <p className="text-center text-lingxm-text-secondary mb-6">
                Language Learning 2.0
              </p>
              <div className="space-y-4 text-sm text-lingxm-text-body">
                <p>
                  <strong>White Header:</strong> Used on the landing page with dark logo
                </p>
                <p>
                  <strong>Blue Header:</strong> Used on the search/learn page with light logo and flag selector
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
