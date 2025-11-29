import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage, SearchPage } from '@/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/learn" element={<SearchPage />} />
        {/* Future routes:
        <Route path="/about" element={<AboutPage />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
