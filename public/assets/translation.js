function TranslateInit() {
    console.log("TranslateInit called");
    if (!window.__GOOGLE_TRANSLATION_CONFIG__) {
        console.error("Config missing.");
        return;
    }
    if (!window.google || !window.google.translate) {
        console.error("Google Translate library not ready.");
        // Belki tekrar denemek için kısa bir gecikme?
        // setTimeout(TranslateInit, 200);
        return;
    }

    // --- GECİKME EKLE ---
    setTimeout(() => {
        console.log("Initializing Google Translate Element after delay...");
        try {
            new google.translate.TranslateElement({
                pageLanguage: window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage,
                autoDisplay: false,
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            });
            console.log("Google Translate Element initialized.");

            // UI gizleme mantığı buraya (veya ayrı bir fonksiyona)
            const hideGoogleUI = () => { /* ... UI gizleme kodu ... */ };
            hideGoogleUI();
            setTimeout(hideGoogleUI, 500); // Daha sonra tekrar dene

        } catch (error) {
            console.error("Error initializing Google Translate Element:", error);
        }
    }, 500); // 500 milisaniye (yarım saniye) bekle. Bu süreyi ayarlayabilirsiniz.
}