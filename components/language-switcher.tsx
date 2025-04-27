'use client';

import { useEffect, useState, useRef, Fragment } from 'react';
import {destroyCookie, parseCookies, setCookie} from 'nookies';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Transition } from '@headlessui/react';

interface LanguageDescriptor {
    name: string;
    title: string;
}

const COOKIE_NAME = 'googtrans';

// Global type declaration (Mevcut)
declare global {
    namespace globalThis {
        var google: any;
        var __GOOGLE_TRANSLATION_CONFIG__: {
            languages: LanguageDescriptor[];
            defaultLanguage: string;
        };
    }
}

const LanguageSwitcher = () => {
    const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);
    const [languageConfig, setLanguageConfig] = useState<{
        languages: LanguageDescriptor[];
        defaultLanguage: string;
    } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Config'i yükle
        if (globalThis.__GOOGLE_TRANSLATION_CONFIG__) {
            const config = globalThis.__GOOGLE_TRANSLATION_CONFIG__;
            setLanguageConfig(config);

            // Config yüklendikten sonra çerezi oku
            const cookies = parseCookies(); // Nookies kullanılıyor
            const existingLanguageCookieValue = cookies[COOKIE_NAME];
            let languageValue = config.defaultLanguage; // Varsayılanla başla

            console.log(`LanguageSwitcher: Initial cookie read: ${existingLanguageCookieValue}`); // Loglama

            if (existingLanguageCookieValue) {
                // Çerezin URL decode edilmiş halini alalım (Nookies bunu otomatik yapabilir)
                // const decodedCookieValue = decodeURIComponent(existingLanguageCookieValue); // Gerekirse
                const sp = existingLanguageCookieValue.split('/');
                if (sp.length >= 2) {
                    // /auto/xx veya /source/xx formatında son kısım hedef dildir
                    const targetLang = sp[sp.length - 1];
                    // Hedef dil destekleniyorsa onu kullan
                    if (targetLang && config.languages.some(l => l.name === targetLang)) {
                        languageValue = targetLang;
                        console.log(`LanguageSwitcher: Determined language from cookie: ${languageValue}`);
                    } else {
                        console.warn(`LanguageSwitcher: Cookie language '${targetLang}' not supported or invalid format. Using default: ${config.defaultLanguage}`);
                        // Desteklenmiyorsa veya format bozuksa varsayılana dön (ve belki çerezi düzelt?)
                        // Opsiyonel: Burada çerezi /auto/defaultLanguage olarak düzeltebiliriz.
                        // setCookie(null, COOKIE_NAME, `/auto/${config.defaultLanguage}`, { path: '/', maxAge: 30 * 24 * 60 * 60 });
                        // languageValue = config.defaultLanguage; // Zaten yukarıda ayarlı
                    }
                } else {
                    console.warn(`LanguageSwitcher: Invalid cookie format '${existingLanguageCookieValue}'. Using default: ${config.defaultLanguage}`);
                    // Format hatalıysa varsayılana dön ve çerezi düzelt
                    // setCookie(null, COOKIE_NAME, `/auto/${config.defaultLanguage}`, { path: '/', maxAge: 30 * 24 * 60 * 60 });
                    // languageValue = config.defaultLanguage; // Zaten yukarıda ayarlı
                }
            } else {
                console.log(`LanguageSwitcher: No cookie found. Using default: ${config.defaultLanguage}. Setting initial cookie.`);
                // İlk açılışta çerez yoksa, varsayılan dille AYARLA
                setCookie(null, COOKIE_NAME, `/auto/${config.defaultLanguage}`, {
                    path: '/',
                    maxAge: 30 * 24 * 60 * 60, // 30 gün geçerli
                });
                languageValue = config.defaultLanguage;
            }
            setCurrentLanguage(languageValue);

        } else {
            console.warn('Google Translation config not found during initial component load.');
        }

        // Click outside listener (Mevcut)
        function handleClickOutside(event: MouseEvent) { /* ... */ }
        document.addEventListener('mousedown', handleClickOutside);
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
    }, []); // Sadece ilk renderda çalışır

    // Dil değiştirme fonksiyonu (Mevcut - Doğru görünüyor)
    const switchLanguage = (lang: string) => {
        const newCookieValue = `/auto/${lang}`;
        const cookieOptions = {
            path: '/',
            // Domain'i belirtmek önemlidir. Tarayıcılar güvenlik nedeniyle
            // '.bakubau.de' gibi üst domainler için çerez silmeye/yazmaya
            // her zaman izin vermeyebilir, ancak denemekte fayda var.
            // Nookies'in varsayılan davranışı genellikle yeterlidir,
            // ama explicit olmak için deneyebiliriz.
        };
        const specificDomainOptions = { ...cookieOptions, domain: 'bakubau.de' };
        const broaderDomainOptions = { ...cookieOptions, domain: '.bakubau.de' };


        console.log(`LanguageSwitcher: Attempting to clear cookies for ${COOKIE_NAME}`);

        // Önce mevcut çerezleri silmeye çalışalım (her iki domain için de)
        // Not: Nookies `destroyCookie` argümanları (ctx, name, options) şeklindedir. Client-side için ctx null'dır.
        try {
            // Spesifik domain için sil
            destroyCookie(null, COOKIE_NAME, specificDomainOptions);
            console.log(`Attempted delete for domain: ${specificDomainOptions.domain}`);
            // Geniş domain için sil (Tarayıcı izin verirse)
            destroyCookie(null, COOKIE_NAME, broaderDomainOptions);
            console.log(`Attempted delete for domain: ${broaderDomainOptions.domain}`);
            // Sadece path ile silmeyi de deneyelim (varsayılan domain için)
            destroyCookie(null, COOKIE_NAME, { path: '/' });
            console.log(`Attempted delete for default domain (path only)`);

        } catch (error) {
            console.error("Error destroying cookies:", error);
        }


        // Kısa bir gecikme ekleyerek silme işleminin tamamlanmasını bekleyebiliriz (genelde gerekmez)
        // setTimeout(() => {
        console.log(`LanguageSwitcher: Setting cookie to: ${newCookieValue} for default domain`);
        // Şimdi doğru çerezi sadece varsayılan/spesifik domain için AYARLA
        setCookie(null, COOKIE_NAME, newCookieValue, {
            path: '/',
            maxAge: 30 * 24 * 60 * 60, // 30 gün
            // domain: 'bakubau.de' // Gerekirse domain'i burada da belirtebilirsiniz
            // ama genelde Nookies varsayılanı (mevcut domain) doğrudur.
        });

        // Sayfayı yeniden yükle
        setTimeout(() => {
            window.location.reload();
        }, 150); // Çok kısa bir gecikme yeterli olmalı
        // }, 50); // Silme için bekleme gecikmesi (opsiyonel)

    };

    // ... (Geri kalan render kısmı aynı) ...

    if (!currentLanguage || !languageConfig) {
        return <div className="h-9 w-28 rounded bg-gray-200 animate-pulse"></div>;
    }

    const currentLangDescriptor = languageConfig.languages.find(
        (ld) => ld.name === currentLanguage
    );
    const currentTitle = currentLangDescriptor ? currentLangDescriptor.title : (currentLanguage ? currentLanguage.toUpperCase() : '...'); // currentLanguage null olabilir

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

export { LanguageSwitcher, COOKIE_NAME };
