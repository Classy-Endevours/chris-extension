// Listen to messages sent from other parts of the extension.
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   // onMessage must return "true" if response is async.

//   const event = new Event(request.startSnipping);
//   document.dispatchEvent(event);
// });

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
