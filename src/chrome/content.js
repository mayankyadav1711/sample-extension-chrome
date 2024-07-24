/*global chrome*/
function getFullPageSize() {
  return {
    width: Math.max(
      document.documentElement.scrollWidth,
      document.body.scrollWidth
    ),
    height: Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    ),
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageSize") {
    sendResponse(getFullPageSize());
  }
});