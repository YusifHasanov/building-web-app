'use client';
import { useEffect, useState, useRef } from 'react';
import { parseCookies, setCookie } from 'nookies';

interface LanguageDescriptor {
    name: string;
    title: string;
}

// Google çeviri için kullanılan cookie adıdır.
const COOKIE_NAME = 'googtrans';

// Global tanımlı dil konfigürasyonu
declare global {
    namespace globalThis {
        var __GOOGLE_TRANSLATION_CONFIG__: {
            languages: LanguageDescriptor[];
            defaultLanguage: string;
        };
    }
}

const LanguageSwitcher = () => {
    const [currentLanguage, setCurrentLanguage] = useState<string>();
    const [languageConfig, setLanguageConfig] = useState<any>();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Translation engine ve dil konfigürasyonunu initialize et
    useEffect(() => {
        const cookies = parseCookies();
        const existingLanguageCookieValue = cookies[COOKIE_NAME];

        let languageValue;
        if (existingLanguageCookieValue) {
            const sp = existingLanguageCookieValue.split('/');
            if (sp.length > 2) {
                languageValue = sp[2];
            }
        }
        if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
            languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
        }
        if (languageValue) {
            setCurrentLanguage(languageValue);
        }
        if (global.__GOOGLE_TRANSLATION_CONFIG__) {
            setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
        }
    }, []);

    // Dropdown dışına tıklanırsa menüyü kapat
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!currentLanguage || !languageConfig) {
        return null;
    }

    // Dil değiştirme fonksiyonu
    const switchLanguage = (lang: string) => {
        setCookie(null, COOKIE_NAME, '/auto/' + lang);
        window.location.reload();
    };

    // Mevcut dili gösteren tanımlayıcıyı bulalım
    const currentLangDescriptor = languageConfig.languages.find(
        (ld: LanguageDescriptor) =>
            ld.name === currentLanguage ||
            (currentLanguage === 'auto' && languageConfig.defaultLanguage === ld.name)
    );
    const currentTitle = currentLangDescriptor ? currentLangDescriptor.title : 'Select Language';

    return (
        <div className="relative inline-block text-left notranslate" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex justify-between items-center w-48 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
                {currentTitle}
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="py-1">
                        {languageConfig.languages.map((ld: LanguageDescriptor) => (
                            <a
                                key={`l_s_${ld.name}`}
                                onClick={() => {
                                    switchLanguage(ld.name);
                                    setIsOpen(false);
                                }}
                                className={`block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                                    currentLanguage === ld.name ||
                                    (currentLanguage === 'auto' && languageConfig.defaultLanguage === ld.name)
                                        ? 'text-orange-500'
                                        : 'text-gray-700'
                                }`}
                            >
                                {ld.title}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export { LanguageSwitcher, COOKIE_NAME };