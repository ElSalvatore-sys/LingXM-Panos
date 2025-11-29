import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/contexts/AppContext';
import { LandingPage, SearchPage } from '@/pages';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/learn" element={<SearchPage />} />
          {/* Future routes:
          <Route path="/about" element={<AboutPage />} />
          */}
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
