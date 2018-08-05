const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (evt, data) => {
  if (data) {
    ffmpeg.ffprobe(data, (err, { format: { duration } }) => {
      mainWindow.webContents.send('video:duration', duration);
    });
  }
});
