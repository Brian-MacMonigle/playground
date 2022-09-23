const { ipcRenderer, contextBridge } = require("electron");
const rust = require("../../lib/index.node");
const ReactDOM = require("react-dom/client");
const React = require("react");
const { Root } = require("../build/Root.js");

window.addEventListener("DOMContentLoaded", function () {
  const props = {
    rust,
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  };

  // React entry point
  ReactDOM.createRoot(document.getElementById("root")).render(
    React.createElement(Root, props)
  );
});
