const fontSizeInput = document.getElementById("fontSize");
// chrome.storage.sync.get("fontSize", (style) => {
//   if (style.fontSize) {
//     fontSizeInput.value = style.fontSize;
//   } else {
//     fontSizeInput.value = "";
//   }
// });

let fontSizeValue;

["change", "keyup"].forEach((ev) => {
  fontSizeInput.addEventListener(ev, () => {
    fontSizeValue = fontSizeInput.value;
  });
});

document.getElementById("btnChange").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        fontSize: fontSizeValue,
      },
      (response) => {
        console.log(response);
      }
    );
  });
});

chrome.storage.sync.onChanged.addListener(function (changes, namespace) {});
