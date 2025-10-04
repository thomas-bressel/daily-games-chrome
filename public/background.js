// Service Worker pour l'extension Chrome (Manifest V3)
console.log('Daily Games Extension - Service Worker started');

// Installation de l'extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Daily Games Extension installed successfully');
    // Initialiser le storage avec des données par défaut si nécessaire
    chrome.storage.local.set({
      installed: true,
      installDate: new Date().toISOString()
    });
  } else if (details.reason === 'update') {
    console.log('Daily Games Extension updated to version', chrome.runtime.getManifest().version);
  }
});

// Gestion des messages depuis l'application
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  
  switch (request.action) {
    case 'getData':
      chrome.storage.local.get(['userData'], (result) => {
        sendResponse({ success: true, data: result.userData || {} });
      });
      return true; // Garder le canal ouvert pour la réponse asynchrone
      
    case 'saveData':
      chrome.storage.local.set({ userData: request.data }, () => {
        sendResponse({ success: true });
      });
      return true;
      
    default:
      sendResponse({ success: false, error: 'Unknown action' });
  }
});

// Surveillance de l'activation de l'extension
chrome.runtime.onStartup.addListener(() => {
  console.log('Browser started, Daily Games Extension ready');
});
