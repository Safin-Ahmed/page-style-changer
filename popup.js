const fontSizeInput = document.getElementById("fontSize");
chrome.runtime.sendMessage({ type: "from_popup" }, (response) => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const url = new URL(tabs[0].url);
    const domain = url.origin;
    for (let item of response) {
      console.log(item);
      if (item.domain === domain) {
        fontSizeInput.value = item.size;
      }
    }
  });
});
// chrome.storage.sync.get("fontSize", (style) => {
//   if (style.fontSize) {
//     fontSizeInput.value = style.fontSize;
//   } else {
//     fontSizeInput.value = "";
//   }
// });

let fontSizeValue;

[("change", "keyup")].forEach((ev) => {
  fontSizeInput.addEventListener(ev, () => {
    fontSizeValue = fontSizeInput.value;
  });
});

document.getElementById("btnChange").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      fontSize: fontSizeValue,
    });
  });
});
