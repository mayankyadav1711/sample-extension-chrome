// public/background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "takeScreenshot") {
      chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
        // Create a download link and trigger a download
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `screenshot_${Date.now()}.png`;
        link.click();
      });
    }
  });
  