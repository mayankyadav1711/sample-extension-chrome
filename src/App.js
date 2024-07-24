/*global chrome*/
import React, { useState } from 'react';
import "./App.css"

function App() {
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const captureScreenshot = () => {
    setLoading(true);
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: "getPageSize" }, () => {
          chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
            setScreenshotUrl(dataUrl);
            setLoading(false);
          });
        });
      });
    } else {
      console.error('Chrome APIs are not available');
      setLoading(false);
    }
  };

  const handleSave = () => {
    const link = document.createElement('a');
    link.href = screenshotUrl;
    link.download = 'screenshot.png';
    link.click();
  };

  const handleRetake = () => {
    setScreenshotUrl(null);
    captureScreenshot();
  };

  const handleCancel = () => {
    setScreenshotUrl(null);
  };

  return (
    <div className="container">
      <div className="inner-container">
        <h1>Website Screenshot</h1>
        
        {!screenshotUrl && (
          <button
            onClick={captureScreenshot}
            className="btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Capturing...
              </>
            ) : (
              'Capture Screenshot'
            )}
          </button>
        )}

{screenshotUrl && (
  <div className="screenshot-preview">
    <img src={screenshotUrl} alt="Screenshot preview" />
    <div className="preview-overlay">Preview</div>
    
    <div className="button-group">
      <button onClick={handleSave} className="btn save-btn">
        Save
      </button>
      <button onClick={handleRetake} className="btn retake-btn">
        Retake
      </button>
      <button onClick={handleCancel} className="btn cancel-btn">
        Cancel
      </button>
    </div>
  </div>
)}
      </div>
      <div className="credit">
        Developed by Mayank Yadav
      </div>
    </div>
  );
}

export default App;