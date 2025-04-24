'use client';
import { useEffect, useState, useRef, Fragment } from 'react'; // Added Fragment
import { parseCookies, setCookie } from 'nookies';
import { Globe, ChevronDown, Check } from 'lucide-react'; // Added Check icon
import { Transition } from '@headlessui/react'; // Using Headless UI for transition

interface LanguageDescriptor {
    name: string;
    title: string;
}

const COOKIE_NAME = 'googtrans';

// Global type declaration (ensure this is appropriate for your project setup)
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
    const [languageConfig, setLanguageConfig] = useState<{
        languages: LanguageDescriptor[];
        defaultLanguage: string;
    } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cookies = parseCookies();
        const existingLanguageCookieValue = cookies[COOKIE_NAME];
        let languageValue = 'auto'; // Default to auto if no cookie

        if (existingLanguageCookieValue) {
            const sp = existingLanguageCookieValue.split('/');
            if (sp.length > 2 && sp[2]) { // Check if sp[2] exists
                languageValue = sp[2];
            }
        }

        // Use configured default language if cookie is 'auto' or not set correctly
        if (languageValue === 'auto' && globalThis.__GOOGLE_TRANSLATION_CONFIG__) {
            languageValue = globalThis.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
        }

        setCurrentLanguage(languageValue);

        if (globalThis.__GOOGLE_TRANSLATION_CONFIG__) {
            setLanguageConfig(globalThis.__GOOGLE_TRANSLATION_CONFIG__);
        } else {
            // Handle case where config might not be loaded yet or doesn't exist
            console.warn('Google Translation config not found.');
        }
    }, []);

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
        // Return a placeholder or null while loading/if config missing
        return <div className="h-9 w-28 bg-gray-200 rounded animate-pulse"></div>; // Simple placeholder
    }

    const switchLanguage = (lang: string) => {
        setCookie(null, COOKIE_NAME, '/auto/' + lang, {
            path: '/', // Ensure cookie is set for the whole domain
            maxAge: 30 * 24 * 60 * 60, // Example: 30 days expiry
        });
        // Use requestAnimationFrame to schedule reload with the browser's paint cycle
        requestAnimationFrame(() => {
             // Adding a second frame might give slightly more buffer
             requestAnimationFrame(() => {
                 window.location.reload();
             });
        });
    };

    const currentLangDescriptor = languageConfig.languages.find(
        (ld) => ld.name === currentLanguage
    );

    // Fallback title if descriptor not found (shouldn't happen often with logic above)
    const currentTitle = currentLangDescriptor ? currentLangDescriptor.title : 'Select Language';

    const isActive = (langName: string) => {
        return currentLanguage === langName;
    }

    return (
        <div className="relative inline-block text-left notranslate" ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center justify-center gap-x-1.5 w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-yellow"
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
                    className="absolute left-0 sm:right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="language-menu-button"
                    tabIndex={-1}
                >
                    <div className="py-1" role="none">
                        {languageConfig.languages.map((ld: LanguageDescriptor) => (
                            <a
                                key={`l_s_${ld.name}`}
                                href="#" // Use href="#" for semantic correctness, onClick handles action
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent default link behavior
                                    if (!isActive(ld.name)) { // Only switch if different
                                        switchLanguage(ld.name);
                                    }
                                    setIsOpen(false);
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

export { LanguageSwitcher, COOKIE_NAME }; // Export COOKIE_NAME if needed elsewhere
