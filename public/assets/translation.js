
// Global scope'da veya script içinde çalışan TranslateInit için plain JS cookie fonksiyonları

function setJsCookie(name, value, days, domain) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    let cookieString = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/";
    if (domain) {
        cookieString += "; domain=" + domain;
    }
    document.cookie = cookieString;
    console.log(`JS Cookie set: ${cookieString}`);
}

function deleteJsCookie(name, domain, path = '/') {
    let cookieString = name + "=; Max-Age=-99999999; path=" + path;
    if (domain) {
        cookieString += "; domain=" + domain;
    }
    document.cookie = cookieString;
    console.log(`JS Cookie delete attempted: ${cookieString}`);
}

function getJsCookie(name) {
    // ... (Önceki mesajdaki getCookie fonksiyonu) ...
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
    }
    return null;
}

// --- GÜNCELLENMİŞ TranslateInit ---
function TranslateInit() {
    console.log("TranslateInit called");
    const COOKIE_NAME = 'googtrans';
    const CURRENT_DOMAIN = window.location.hostname; // Örneğin "bakubau.de"
    // Geniş domain genellikle başına '.' eklenerek belirtilir, ancak silme işleminde doğrudan yazmak daha güvenli olabilir.
    const BROADER_DOMAIN = CURRENT_DOMAIN.startsWith('www.') ? '.' + CURRENT_DOMAIN.substring(4) : '.' + CURRENT_DOMAIN; // Örneğin ".bakubau.de"


    if (!window.__GOOGLE_TRANSLATION_CONFIG__) { /* ... Hata kontrolü ... */ return; }
    const config = window.__GOOGLE_TRANSLATION_CONFIG__;
    if (!window.google || !window.google.translate) { /* ... Hata kontrolü ... */ return; }

    // 1. Hedef dili belirle (Varsayılan veya mevcut DOĞRU formattaki çerezden)
    let targetLanguage = config.defaultLanguage;
    const existingCookie = getJsCookie(COOKIE_NAME); // Sadece mevcut domaindeki okunur genelde
    console.log("TranslateInit: Existing cookie value:", existingCookie);

    if (existingCookie && existingCookie.startsWith('/auto/')) {
        const parts = existingCookie.split('/');
        if (parts.length === 3) { // /auto/xx formatı
            const cookieLang = parts[2];
            if (config.languages.some(l => l.name === cookieLang)) {
                targetLanguage = cookieLang;
                console.log(`TranslateInit: Using language from valid cookie: ${targetLanguage}`);
            }
        }
    } else if(existingCookie) {
        console.log(`TranslateInit: Cookie exists but not in /auto/xx format ('${existingCookie}'). Will reset based on default.`);
        // Yanlış formatta (/de/en gibi) bir çerez varsa, bunu dikkate alma, varsayılana göre hareket et.
    }
    else {
        console.log(`TranslateInit: No cookie found. Using default language: ${targetLanguage}`);
    }

    const desiredCookieValue = `/auto/${targetLanguage}`;

    // 2. Widget başlatmadan ÖNCE çakışan çerezleri temizle
    console.log(`TranslateInit: Attempting to clear conflicting cookies before init...`);
    deleteJsCookie(COOKIE_NAME, CURRENT_DOMAIN, '/'); // Spesifik domain
    deleteJsCookie(COOKIE_NAME, BROADER_DOMAIN, '/'); // Geniş domain
    // Sadece path ile de silmeyi dene (ne olur ne olmaz)
    deleteJsCookie(COOKIE_NAME, null, '/');


    // 3. Doğru çerezi AYARLA (spesifik domain için)
    console.log(`TranslateInit: Setting cookie to ensure correct state: ${desiredCookieValue} on domain ${CURRENT_DOMAIN}`);
    setJsCookie(COOKIE_NAME, desiredCookieValue, 30, CURRENT_DOMAIN); // 30 gün, spesifik domain


    // 4. Widget'ı başlat (Gecikmesiz veya çok kısa gecikmeyle)
    // setTimeout(() => { // Gecikme büyük ihtimalle artık gereksiz
    console.log("TranslateInit: Initializing Google Translate Element...");
    try {
        new google.translate.TranslateElement({
            // pageLanguage ayarını KULLANMA! Widget'ın çerezden okumasını sağla.
            autoDisplay: false,
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        });
        console.log("Google Translate Element initialized.");

        // UI Gizleme
        const hideGoogleUI = () => { /* ... UI gizleme kodu ... */ };
        hideGoogleUI();
        setTimeout(hideGoogleUI, 500);
        setTimeout(hideGoogleUI, 1000);

    } catch (error) {
        console.error("Error initializing Google Translate Element:", error);
    }
    // }, 50);

}

// // Bu fonksiyonu global scope'a veya erişilebilir bir yere taşıyın
// // Nookies'i burada kullanamayız (client-side değilse), bu yüzden basit JS cookie fonksiyonları lazım
// function setCookie(name, value, days) {
//     var expires = "";
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//         expires = "; expires=" + date.toUTCString();
//     }
//     // encodeURIComponent kullanarak çerez değerini güvenli hale getirin
//     document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/";
//     console.log(`Cookie set: ${name}=${value}`); // Loglama
// }
//
// function getCookie(name) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0;i < ca.length;i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1,c.length);
//         // decodeURIComponent ile çerez değerini okuyun
//         if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
//     }
//     return null;
// }
//
//
// // --- GÜNCELLENMİŞ TranslateInit ---
// function TranslateInit() {
//     console.log("TranslateInit called");
//     const COOKIE_NAME = 'googtrans'; // Cookie ismini sabit yapalım
//
//     if (!window.__GOOGLE_TRANSLATION_CONFIG__) {
//         console.error("Config missing.");
//         return;
//     }
//     const config = window.__GOOGLE_TRANSLATION_CONFIG__;
//
//     if (!window.google || !window.google.translate) {
//         console.error("Google Translate library not ready.");
//         // Gerekirse tekrar denemek için kısa bir gecikme eklenebilir
//         // setTimeout(TranslateInit, 200);
//         return;
//     }
//
//     // 1. Mevcut çerezi oku
//     const existingCookie = getCookie(COOKIE_NAME);
//     let targetLanguage = config.defaultLanguage; // Varsayılan dil ile başla
//
//     console.log("Existing cookie value:", existingCookie); // Mevcut çerezi logla
//
//     // 2. Çerez varsa ve geçerliyse, hedef dili çerezden al
//     if (existingCookie) {
//         const parts = existingCookie.split('/');
//         // Formatın /auto/xx veya /source/xx olduğunu varsayıyoruz. Son kısım hedef dildir.
//         if (parts.length >= 2) {
//             const cookieLang = parts[parts.length - 1];
//             // Hedef dilin desteklenen diller arasında olup olmadığını kontrol et
//             if (cookieLang && config.languages.some(l => l.name === cookieLang)) {
//                 targetLanguage = cookieLang;
//                 console.log(`Language from cookie: ${targetLanguage}`);
//             } else {
//                 console.warn(`Unsupported language '${cookieLang}' in cookie or invalid format. Using default: ${config.defaultLanguage}`);
//                 targetLanguage = config.defaultLanguage; // Geçersizse varsayılana dön
//             }
//         } else {
//             console.warn(`Invalid cookie format: '${existingCookie}'. Using default: ${config.defaultLanguage}`);
//             targetLanguage = config.defaultLanguage; // Format hatalıysa varsayılana dön
//         }
//     } else {
//         console.log(`No cookie found. Using default language: ${targetLanguage}`);
//     }
//
//     // 3. Widget'ı başlatmadan ÖNCE çerezi /auto/targetLanguage formatında AYARLA
//     // Bu, widget'ın başlatıldığında doğru çerezi bulmasını sağlar.
//     const desiredCookieValue = `/auto/${targetLanguage}`;
//     // Sadece mevcut çerez değeri istenenden farklıysa yeniden ayarla
//     if (existingCookie !== desiredCookieValue) {
//         console.log(`Setting cookie to ensure correct state: ${desiredCookieValue}`);
//         setCookie(COOKIE_NAME, desiredCookieValue, 30); // 30 gün geçerli
//     } else {
//         console.log(`Cookie already has desired value: ${existingCookie}`);
//     }
//
//
//     // 4. Widget'ı başlat (Gecikme hala gerekliyse kalabilir ama çerez artık doğru olmalı)
//     // setTimeout(() => { // Gecikmeyi kaldırıp deneyebiliriz veya çok kısa tutabiliriz (örn: 50ms)
//     console.log("Initializing Google Translate Element...");
//     try {
//         new google.translate.TranslateElement({
//             // pageLanguage: config.defaultLanguage, // BU AYARI KALDIRMAYI DENEYİN! Widget çerezden okusun.
//             autoDisplay: false,
//             layout: google.translate.TranslateElement.InlineLayout.SIMPLE
//         });
//         console.log("Google Translate Element initialized.");
//
//         // UI gizleme mantığı
//         const hideGoogleUI = () => {
//             const googleFrame = document.querySelector('.goog-te-banner-frame');
//             const googleBar = document.querySelector('.goog-te-gadget');
//             const bodyTop = document.body.style.top;
//
//             if (googleFrame) {
//                 googleFrame.style.display = 'none';
//                 console.log("Google banner frame hidden.");
//             }
//             if (googleBar) {
//                 // Belki sadece içindeki select'i değil, tüm bar'ı gizlemek daha iyidir?
//                 // googleBar.style.display = 'none'; // veya visibility: 'hidden'; position: 'absolute'; top: '-9999px';
//                 // Veya sadece combo'yu gizle:
//                 const selectElement = googleBar.querySelector('.goog-te-combo');
//                 if(selectElement) {
//                     selectElement.style.display = 'none'; // Veya visibility: 'hidden';
//                     console.log("Google language select hidden.");
//                 }
//
//             }
//             // Google'ın eklediği body top stilini sıfırla
//             if (bodyTop !== 'auto' && bodyTop !== '0px') {
//                 document.body.style.top = 'auto';
//                 console.log("Body top style reset.");
//             }
//         };
//
//         // Başlangıçta ve kısa bir süre sonra tekrar gizlemeyi dene (widget render sonrası gelebilir)
//         hideGoogleUI();
//         setTimeout(hideGoogleUI, 500);
//         setTimeout(hideGoogleUI, 1000); // Daha da emin olmak için
//
//     } catch (error) {
//         console.error("Error initializing Google Translate Element:", error);
//     }
//     // }, 50); // Çok kısa bir gecikme veya 0
//
// }
