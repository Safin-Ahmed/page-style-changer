console.log("New Content Script is Running");
const p = document.getElementsByTagName("p");
const divs = document.getElementsByTagName("div");

chrome.runtime.onMessage.addListener((req, sender, res) => {
  if (req.fontSize) {
    document.getElementsByTagName(
      "body"
    )[0].style.fontSize = `${req.fontSize}px`;

    for (let para of p) {
      para.style.fontSize = `${req.fontSize}px`;
    }

    for (let div of divs) {
      div.style.fontSize = `${req.fontSize}px`;
    }

    chrome.storage.sync.set({ fontSize: req.fontSize }, () => {
      console.log("Storage Set!");
    });
  }
});
