const fontSizeInput = document.getElementById("fontSize");
let fontSizeValue;

["change", "keyup"].forEach((ev) => {
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
