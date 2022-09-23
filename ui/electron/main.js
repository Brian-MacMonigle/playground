const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  win = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      // Required to allow React to be imported to render in the render processes
      // This allows filesystem access via require()
      sandbox: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("../public/index.html");

  // Auto open DevTools.
  win.webContents.openDevTools();
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
