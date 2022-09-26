const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const rust = require("../../lib/index.node");

function initRendererResizeCallback(window) {
  let cache = { x: 0, y: 0, width: 0, height: 0 };
  function sendSize(_event, conRect = cache) {
    cache = conRect;
    winRect = window.getContentBounds();
    rust.resize({
      left: conRect.x + winRect.x,
      top: conRect.y + winRect.y,
      contentWidth: conRect.width,
      contentHeight: conRect.height,
      windowWidth: winRect.width,
      windowHeight: winRect.height,
    });
  }

  // Send rust new size when React or Electron's window changes size
  ipcMain.on("renderer-resize", sendSize);
  window.on("resize", sendSize);
  window.on("move", sendSize);
}

function createWindow() {
  window = new BrowserWindow({
    width: 1080,
    height: 720,
    show: false, // don't render window (wait for 'ready-to-show' event)
    autoHideMenuBar: true, // don't display 'alt' bar by default
    webPreferences: {
      // Required to allow React to be imported to render in the render processes
      // This allows filesystem access via require()
      sandbox: false,
      preload: path.join(__dirname, "preload.js"),
      devTools: true, // allow dev tools to be opened
    },
  });

  // Open window only when DOM has rendered once
  window.once("ready-to-show", window.show);

  initRendererResizeCallback(window);

  window.loadFile("../public/index.html");
  // Auto open DevTools
  window.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", function () {
  // macOs it's common ofr applications and their menu bar to stay active until the user quits explicityly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // macOs it's comon to re-create a window in the app when the doc icon is clicked and there are no other windows open
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
