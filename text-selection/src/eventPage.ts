// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // onMessage must return "true" if response is async.
  let isResponseAsync = false;

  if (request.popupMounted) {
    console.log("eventPage notified that Popup.tsx has mounted.");
  }

  if(request.type === 'LOAD_SCRIPT') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      fetch(
        request.url,
      )
      .then(res => res.text())
      .then(function (result) {
        chrome.tabs.executeScript({ code: result })
      })
    });
  }

  return isResponseAsync;
});

window.addEventListener("load", function load(event) {
  chrome.browserAction.onClicked.addListener(function (tab) {
    // for the current tab, inject the "inject.js" file & execute it
    console.log({ tab });

    // @ts-ignore
    chrome.tabs.executeScript(tab.ib, {
      file: "inject.js",
    });
  });
});
