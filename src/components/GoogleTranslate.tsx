import React, { useState, useEffect, useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Script from 'next/script';

interface Language {
  value: string;
  label: string;
}

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (options: Record<string, unknown>, element: string): unknown;
          InlineLayout: {
            SIMPLE: string;
          };
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}

const CustomLanguageSelector: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [isGoogleTranslateReady, setIsGoogleTranslateReady] = useState(false);

  const initializeGoogleTranslate = useCallback(() => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en', // Set to your website's default language
          autoDisplay: false
        },
        'google_translate_element'
      );

      const checkForElement = () => {
        const languageSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (languageSelect && Array.prototype.slice.call(languageSelect.options).length) {
          const langs: Language[] = Array.from(languageSelect.options)
            .filter(option => option.value !== '')
            .map(option => ({
              value: option.value,
              label: option.text
            }));
          setLanguages(langs);
          setIsGoogleTranslateReady(true);
        } else {
          console.log('Retry populating languages...');
          setTimeout(checkForElement, 200);
        }
      };
      checkForElement();
    } else {
      // If Google Translate is not ready, try again after a short delay
      setTimeout(initializeGoogleTranslate, 100);
    }
  }, []);

  useEffect(() => {
    window.googleTranslateElementInit = initializeGoogleTranslate;
  }, [initializeGoogleTranslate]);

  const handleLanguageChange = useCallback((value: string) => {
    setSelectedLanguage(value);
    if (isGoogleTranslateReady) {
      const googleCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (googleCombo) {
        googleCombo.value = value;
        const event = new Event('change', { bubbles: true, cancelable: true });
        googleCombo.dispatchEvent(event);
      } else {
        console.error('Google Translate combo not found');
      }
    } else {
      console.error('Google Translate not ready');
    }
  }, [isGoogleTranslateReady]);

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <div className="notranslate">
        <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent className="notranslate">
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default CustomLanguageSelector;