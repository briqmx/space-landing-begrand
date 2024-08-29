var initESW = function(gslbBaseURL) {
  embedded_svc.settings.displayHelpButton = true; //O falso
  embedded_svc.settings.language = 'es-MX';

  //embedded_svc.settings.defaultMinimizedText = '...'; //(Toma como valor predeterminado Sesión de chat con un experto)
  //embedded_svc.settings.disabledMinimizedText = '...'; //(Toma como valor predeterminado Agente sin conexión)

  embedded_svc.settings.defaultMinimizedText = 'CHATEA CON UN EXPERTO';
  embedded_svc.settings.loadingText = 'Conectando...'; 

  //embedded_svc.settings.loadingText = ''; //(Toma como valor predeterminado Cargando)
  //embedded_svc.settings.storageDomain = 'yourdomain.com'; //(Establece el dominio para su desarrollo de modo que los visitantes puedan navegar por subdominios durante una sesión de chat)

  // Configuración para Plática
  //embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
    // Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
    // Returns a valid button ID.
  //};
  //embedded_svc.settings.prepopulatedPrechatFields = {}; //Establece el relleno automático de los campos del formulario previo al chat
  //embedded_svc.settings.fallbackRouting = []; //Una matriz de identificadores de botones, de usuario o userId_buttonId
  //embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Toma como valor predeterminado la opción Contacto)

  embedded_svc.settings.enabledFeatures = ['LiveAgent'];
  embedded_svc.settings.entryFeature = 'LiveAgent';

  embedded_svc.init(
    'https://begrand.my.salesforce.com',
    'https://begrand.my.site.com/begrandfrontdesk',
    gslbBaseURL,
    '00Df20000019tKD',
    'Live_Agent_SumaMetros',
    {
      baseLiveAgentContentURL: 'https://c.la3-core1.sfdc-lywfpd.salesforceliveagent.com/content',
      deploymentId: '572f2000000fy7G',
      buttonId: '573Qm0000006FM9',
      baseLiveAgentURL: 'https://d.la3-core1.sfdc-lywfpd.salesforceliveagent.com/chat',
      eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04IQm0000002bujMAA_18f08b0b089',
      isOfflineSupportEnabled: false
    }
  );
};

if (!window.embedded_svc) {
  var s = document.createElement('script');
  s.setAttribute('src', 'https://begrand.my.salesforce.com/embeddedservice/5.0/esw.min.js');
  s.onload = function() {
    initESW(null);
  };
  document.body.appendChild(s);
} else {
  initESW('https://service.force.com');
}