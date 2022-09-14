const { ipcRenderer } = require("electron");

// Demo injection of node context into webpage
window.addEventListener("DOMContentLoaded", function () {
  function replaceText(selector, text) {
    document.getElementById(selector).innerText = text;
  }

  for (const dependency of ["Chrome", "Node", "Electron"]) {
    replaceText(
      dependency.toLowerCase(),
      `${dependency} version is ${process.versions[dependency.toLowerCase()]}`
    );
  }

  // Demo connection of rust lib into webpage securly
  ipcRenderer
    .invoke("rust", "hello", "Rust!")
    .then((text) => replaceText("rust", text))
    .catch(console.error);

  ipcRenderer.invoke("rust", "none").catch(console.error);

  ipcRenderer
    .invoke("rust", "hello", 1234)
    .then(console.log)
    .catch(console.error);
});
