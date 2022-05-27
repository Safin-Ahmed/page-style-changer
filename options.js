const clearFontSize = document.getElementById("clearFontSize");
clearFontSize.addEventListener("click", () => {
  chrome.storage.sync.set({ fontSize: "" }, () => {
    close();
  });
});
