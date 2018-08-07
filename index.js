const electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      backgroundThrottling: false,
    },
  });
});
