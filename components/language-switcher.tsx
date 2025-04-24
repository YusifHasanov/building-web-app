'use client';

import { useEffect, useState, useRef, Fragment } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Transition } from '@headlessui/react';

interface LanguageDescriptor {
    name: string;
    title: string;
}

const COOKIE_NAME = 'googtrans';

// Global type declaration (Eğer projenizde global tipler için farklı bir yöntem varsa ona uyarlayın)
declare global {
    namespace globalThis {
        var google: any; // Google Translate nesnesi için tip ekleyelim
        var __GOOGLE_TRANSLATION_CONFIG__: {
            languages: LanguageDescriptor[];
            defaultLanguage: string;
        };
    }
}

const LanguageSwitcher = () => {
    const [currentLanguage, setCurrentLanguage] = useState<string | null>(null); // Başlangıçta null olabilir
    const [languageConfig, setLanguageConfig] = useState<{
        languages: LanguageDescriptor[];
        defaultLanguage: string;
    } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Önce global config'i yüklemeye çalışalım
        if (globalThis.__GOOGLE_TRANSLATION_CONFIG__) {
            const config = globalThis.__GOOGLE_TRANSLATION_CONFIG__;
            setLanguageConfig(config);

            // Config yüklendikten sonra çerezi oku ve dili ayarla
            const cookies = parseCookies();
            const existingLanguageCookieValue = cookies[COOKIE_NAME];
            let languageValue = config.defaultLanguage; // Varsayılan olarak config'deki dil

            if (existingLanguageCookieValue) {
                const sp = existingLanguageCookieValue.split('/');
                // Çerezin formatı /auto/xx veya /en/xx gibi olabilir, son kısım hedef dildir
                if (sp.length >= 2 && sp[sp.length - 1]) {
                     // Google bazen /auto/en gibi bir değer bırakır, bazen sadece dil kodunu
                     // Bizim için önemli olan son kısımdaki hedef dil kodu
                     const targetLang = sp[sp.length - 1];
                     // Hedef dilin, desteklediğimiz diller arasında olup olmadığını kontrol edelim
                     if (config.languages.some(l => l.name === targetLang)) {
                        languageValue = targetLang;
                     }
                }
            }
            setCurrentLanguage(languageValue);

        } else {
            // Config henüz yüklenmemişse veya yoksa uyaralım
            console.warn('Google Translation config not found during initial component load.');
            // Bu durumda geçici bir varsayılan ayarlayabilir veya yüklenene kadar bekleyebiliriz.
            // Şimdilik null bırakalım, yüklenme durumu gösterilsin.
        }
    }, []); // Sadece ilk renderda çalışır

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

    // Dil yüklenirken veya config yoksa bir yüklenme göstergesi göster
    if (!currentLanguage || !languageConfig) {
        return <div className="h-9 w-28 rounded bg-gray-200 animate-pulse"></div>; // Basit bir placeholder
    }

    const switchLanguage = (lang: string) => {
        // Çerezi /auto/hedef_dil formatında ayarla. Google bunu okuyacaktır.
        setCookie(null, COOKIE_NAME, `/auto/${lang}`, {
            path: '/',
            maxAge: 30 * 24 * 60 * 60, // 30 gün geçerli
        });
        // Sayfayı yeniden yükle ki Google Translate çerezi okuyup çeviriyi uygulasın
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };

    const currentLangDescriptor = languageConfig.languages.find(
        (ld) => ld.name === currentLanguage
    );

    // Tanımlayıcı bulunamazsa (normalde olmamalı), dil kodunu göster
    const currentTitle = currentLangDescriptor ? currentLangDescriptor.title : currentLanguage.toUpperCase();

    const isActive = (langName: string) => {
        return currentLanguage === langName;
    }

    return (
        <div className="relative inline-block text-left notranslate" ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center justify-center gap-x-1.5 w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500" // focus rengini ayarlayabilirsiniz
                    id="language-menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    <Globe className="h-4 w-4 text-gray-500" aria-hidden="true" />
                    {currentTitle}
                    <ChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
            </div>

            <Transition
                show={isOpen}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div
                    className="absolute left-0 sm:right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto" // Max yükseklik ve kaydırma eklendi
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="language-menu-button"
                    tabIndex={-1}
                >
                    <div className="py-1" role="none">
                        {languageConfig.languages.map((ld: LanguageDescriptor) => (
                            <a
                                key={`l_s_${ld.name}`}
                                href="#" // Link gibi davranması için # ama tıklamayı engelle
                                onClick={(e) => {
                                    e.preventDefault(); // Sayfanın # hedefine gitmesini engelle
                                    if (!isActive(ld.name)) { // Sadece aktif olmayan dile tıklanırsa değiştir
                                        switchLanguage(ld.name);
                                    } else {
                                        setIsOpen(false); // Aktif dile tıklanırsa menüyü kapat
                                    }
                                }}
                                className={`flex items-center justify-between px-4 py-2 text-sm transition-colors duration-150 ${
                                    isActive(ld.name)
                                        ? 'bg-yellow-50 text-brand-yellow font-semibold'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                                role="menuitem"
                                tabIndex={-1}
                                id={`menu-item-${ld.name}`}
                            >
                                <span>{ld.title}</span>
                                {isActive(ld.name) && (
                                    <Check className="h-4 w-4 text-brand-yellow" aria-hidden="true" />
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export { LanguageSwitcher, COOKIE_NAME }; // COOKIE_NAME'i dışa aktarabilirsiniz
