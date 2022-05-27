const messageQueue = [];
chrome.runtime.onMessage.addListener((req, sender, res) => {
  if (req.type === "from_content") {
    messageQueue.forEach((item) => {
      if (item.domain === req.domain) {
        item.size = req.size;
        return;
      }
    });
    messageQueue.push({ size: req.size, domain: req.domain });
  } else if (req.type === "from_popup") {
    res(messageQueue);
  }
});
