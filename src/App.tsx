import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/contexts/AppContext';
import { LandingPage, SearchPage, BookmarksPage, LearnedPage } from '@/pages';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/learn" element={<SearchPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/learned" element={<LearnedPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
