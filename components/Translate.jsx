'use client';
import React, {useEffect, useState} from 'react';

export default function GoogleTranslateDropdown() {
    // const [isOpen, setIsOpen] = useState(false);

    // useEffect(() => {
    //     function googleTranslateElementInit() {
    //         new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
    //     }
    //     // 1. Append Google Translate script to the DOM once the component mounts
    //     const script = document.createElement('script');
    //     script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    //     script.async = true;
    //     document.body.appendChild(script);
    //
    //     // 2. Define the global callback that Google calls after loading the script
    //     window.googleTranslateElementInit = googleTranslateElementInit;
    //
    //     // Optional cleanup: remove the script if the component unmounts
    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []);
    useEffect(() => {

        const a = document.getElementById("google_translate_element")
        if (a == null) {
            return;
        }
        // Google Translate'in yüklenmesi için global callback fonksiyonu tanımlanıyor.
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {pageLanguage: "ge"}, // Sayfanızın orijinal dili
                "google_translate_element" // Google'ın widget'ı ekleyeceği div'in id'si
            );
        };

        // Google Translate script'ini dinamik olarak ekliyoruz.
        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        // Temizlik (opsiyonel): Component kaldırıldığında script'i de kaldır.
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // // 3. Initialize the Google Translate element
    // const googleTranslateElementInit = () => {
    //     if (window.google && window.google.translate) {
    //         new window.google.translate.TranslateElement(
    //             {
    //                 pageLanguage: 'en', // The original language of your site
    //                 includedLanguages: 'en,es,de', // The languages you want available
    //                 layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
    //                 autoDisplay: false,
    //             },
    //             'google_translate_element'
    //         );
    //     }
    // };
    //
    // // 4. Manually trigger the translation by selecting a language from the hidden dropdown
    // const handleTranslate = (lang) => {
    //     const selectElem = document.querySelector('.goog-te-combo');
    //     if (!selectElem) return;
    //
    //     selectElem.value = lang; // e.g. 'es' for Spanish, 'de' for German
    //     selectElem.dispatchEvent(new Event('change')); // Trigger the change event
    //     setIsOpen(false); // Close the dropdown
    // };
    //
    // return (
    //     <div className="relative inline-block text-left">
    //         {/*
    //     This element is required by Google to render the translator widget.
    //     We hide it with CSS since we manually trigger language changes.
    //   */}
    //         <div id="google_translate_element" style={{display: 'none'}}/>
    //
    //         {/* Dropdown toggle button */}
    //         <button
    //             onClick={() => setIsOpen(!isOpen)}
    //             className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md
    //                bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100
    //                focus:outline-none ring-1 ring-inset ring-gray-300"
    //         >
    //             <FaGlobe className="h-5 w-5 text-gray-500 mr-1"/>
    //             Translate
    //             <div id={"google_translate_element"}>
    //             </div>
    //
    //             <FaAngleDown className="h-5 w-5 text-gray-500 ml-2"/>
    //         </button>
    //
    //         {/* Dropdown menu */}
    //
    //     </div>
    // );

    return (
        <div>

            {/* Google Translate widget'ının yükleneceği alan */}
            <div id="google_translate_element"></div>

        </div>
    );
}