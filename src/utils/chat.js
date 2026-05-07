function initEmbeddedMessaging() {
  try {
    embeddedservice_bootstrap.settings.language = 'es_MX';

    embeddedservice_bootstrap.init(
      '00Df20000019tKD',
      'Enhanced_Chat_Suma_Metros',
      'https://begrand.my.site.com/ESWEnhancedChatSumaMet1778107499808',
      {
        scrt2URL: 'https://begrand.my.salesforce-scrt.com'
      }
    );
  } catch (err) {
    console.error('Error loading Embedded Messaging: ', err);
  }
}

if (!window.embeddedservice_bootstrap) {
  var script = document.createElement('script');
  script.src = 'https://begrand.my.site.com/ESWEnhancedChatSumaMet1778107499808/assets/js/bootstrap.min.js';
  script.onload = initEmbeddedMessaging;
  document.body.appendChild(script);
} else {
  initEmbeddedMessaging();
}