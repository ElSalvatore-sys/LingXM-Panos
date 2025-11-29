import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LanguageCode } from '@/types';
import { Header, Footer } from '@/components/layout';
import { LanguageSelector } from '@/components/features';
import { useTranslation } from '@/hooks/useTranslation';
import mapBg from '@/assets/backgrounds/mapBg.png';

export function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [nativeLanguage, setNativeLanguage] = useState<LanguageCode>('el');
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>('de');

  const handleStart = () => {
    // Navigate to learn page with selected languages
    navigate(`/learn?from=${nativeLanguage}&to=${targetLanguage}`);
  };

  const handleLearnMore = () => {
    // Scroll to info section or navigate to about page
    navigate('/about');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header variant="white" />

      {/* Main content with world map background */}
      <main
        className="flex-1 flex flex-col items-center justify-center py-16 px-4"
        style={{
          backgroundColor: '#c5d1eb',
          backgroundImage: `url(${mapBg})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '98% 100%'
        }}
      >
        {/* Language selection form */}
        <div className="flex flex-col items-center">
          {/* Language selectors row */}
          <div className="flex flex-wrap items-center justify-center gap-5 mb-8">
            {/* Native language selector */}
            <LanguageSelector
              label={t('iSpeak')}
              value={nativeLanguage}
              onChange={setNativeLanguage}
              className="min-w-[235px]"
            />

            {/* Target language selector */}
            <LanguageSelector
              label={t('iWantToPractice')}
              value={targetLanguage}
              onChange={setTargetLanguage}
              className="min-w-[304px]"
            />

            {/* Go button */}
            <button
              onClick={handleStart}
              className="h-[50px] px-7 text-white text-2xl font-normal transition-colors duration-300"
              style={{
                backgroundColor: '#e2678b',
                fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e8236f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#e2678b';
              }}
            >
              {t('go')}
            </button>
          </div>

          {/* Language learning 2.0 text */}
          <div className="mt-24 mb-8">
            <h2
              className="text-center text-white/90 font-light tracking-wide"
              style={{
                fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
                fontSize: '48px',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {t('languageLearning')}
            </h2>
          </div>

          {/* Learn more button */}
          <button
            onClick={handleLearnMore}
            className="h-[50px] px-7 text-white text-2xl font-normal transition-colors duration-300"
            style={{
              backgroundColor: '#e2678b',
              fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e8236f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#e2678b';
            }}
          >
            {t('learnMore')}
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer variant="simple" />
    </div>
  );
}
