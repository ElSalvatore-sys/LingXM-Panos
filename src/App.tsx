import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Future routes:
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/about" element={<AboutPage />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
