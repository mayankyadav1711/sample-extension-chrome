/*global chrome*/
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "takeScreenshot") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      sendResponse({ screenshotUrl: dataUrl });
    });
    return true;
  }
});