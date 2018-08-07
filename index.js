const path = require('path');
const electron = require('electron');
const CustomTray = require('./src/custom-tray');
const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 100,
    height: 200,
    frame: false,
    resizable: false,
    show: false,
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => app.quit());

  const iconPath = path.join(__dirname, './src/assets/tray-icon.png');
  new CustomTray(iconPath, mainWindow);
});
