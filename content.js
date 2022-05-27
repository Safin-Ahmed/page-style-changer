console.log("New Content Script is Running");
const p = document.getElementsByTagName("p");
const divs = document.getElementsByTagName("div");

const getStorageData = () => {
  const getData = localStorage.getItem("fontSize");
  const finalData = JSON.parse(getData);

  return finalData.fontSize;
};

console.log(getStorageData());

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

    const localStorageData = { fontSize: req.fontSize };

    localStorage.setItem("fontSize", JSON.stringify(localStorageData));

    chrome.storage.sync.set({ fontSize: getStorageData() }, () => {
      console.log("Storage Set!");

      res({ fontSize: getStorageData() });
    });
  }
});
