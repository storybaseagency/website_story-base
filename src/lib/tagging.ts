// Reihenfolge im <head> (wichtig für Google Consent Mode v2). Alles steht in
// Inline-Skripten, weil React externe async-Skripte im <head> nach vorn zieht:
// 1. Consent-Ausgangszustand „abgelehnt“ – bevor irgendein Google-Tag lädt
// 2. Cookiebot – sendet nach der Auswahl im Banner automatisch das Consent-Update
// 3. Google Tag Manager – Tags darin feuern nur mit passender Einwilligung

import { site } from "./site";

export const consentAndCookiebotScript = `
document.documentElement.classList.add('js');
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
(function(d){var c=d.createElement('script');c.id='Cookiebot';c.src='https://consent.cookiebot.com/uc.js';
c.setAttribute('data-cbid','${site.cookiebotId}');c.setAttribute('data-culture','de');c.async=true;
d.head.appendChild(c);})(document);
`;

// Offizielles Tag-Manager-Snippet
export const gtmScript = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${site.gtmId}');
`;
