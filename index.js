const path = require('path');
const electron = require('electron');
const CustomTray = require('./src/custom-tray');
const MainWindow = require('./src/main-window');
const { app, ipcMain } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
  app.dock.hide();
  mainWindow = new MainWindow();
  const iconPath = path.join(__dirname, './src/assets/tray-icon.png');

  // тут можно не сохранять в переменную, НО тогда ее вычистит GC
  tray = new CustomTray(iconPath, mainWindow);
});

ipcMain.on('timer:tick', (evt, data) => {
  tray.setTitle(data.toString());
});

ipcMain.on('timer:end', () => tray.setTitle(''));
