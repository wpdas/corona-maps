import { useState, useCallback } from 'react';
import i18next from 'i18next';

import Labels from './labels';
import en from './en.json';
import pt from './pt.json';

type Language = 'en' | 'pt';

const availableLanguages = {
  PT: 'pt' as Language,
  EN: 'en' as Language,
};

const navigatorLanguage = window.navigator.language.includes('pt')
  ? availableLanguages.PT
  : availableLanguages.EN;

const initialLanguage: Language =
  (localStorage.getItem('language') as Language) || navigatorLanguage;

i18next.init({
  lng: initialLanguage,
  resources: {
    ...en,
    ...pt,
  },
});

/**
 * useI18n - Custom Hook for internationalization
 */
const useI18n = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    initialLanguage,
  );

  const setLanguage = useCallback((language: Language) => {
    i18next.changeLanguage(language, () => {
      localStorage.setItem('language', language);
      setCurrentLanguage(language);
    });
  }, []);

  return {
    /**
     * Get a text by label key
     */
    text: (label: string) => i18next.t(label),
    /**
     * Label keys
     */
    labels: Labels,
    /**
     * Current language
     */
    language: currentLanguage,
    /**
     * Available languages
     */
    languages: availableLanguages,
    /**
     * Set language
     */
    setLanguage,
  };
};

export default useI18n;
