console.log("New Content Script is Running");
const p = document.getElementsByTagName("p");
const divs = document.getElementsByTagName("div");

const getStorageData = () => {
  const getData = localStorage.getItem("fontSize");
  if (!getData) {
    localStorage.setItem("fontSize", JSON.stringify({ fontSize: 0 }));
  } else if (getData) {
    const finalData = JSON.parse(getData);
    const fontSize = finalData.fontSize;
    return fontSize;
  }
};

chrome.runtime.sendMessage({
  type: "from_content",
  size: getStorageData(),
  domain: document.location.origin,
});

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

    chrome.runtime.sendMessage({
      type: "from_content",
      size: getStorageData(),
      domain: document.location.origin,
    });
  }
});
