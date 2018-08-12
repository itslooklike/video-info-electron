const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const { app, BrowserWindow, ipcMain, shell } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      backgroundThrottling: false,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

ipcMain.on('videos:added', (event, videos) => {
  const promises = videos.map(
    (video) =>
      new Promise((resolve) =>
        ffmpeg.ffprobe(video.path, (err, metadata) =>
          resolve({ ...video, duration: metadata.format.duration, format: 'avi' })
        )
      )
  );

  Promise.all(promises).then((results) =>
    mainWindow.webContents.send('metadata:complete', results)
  );
});

ipcMain.on('conversion:start', (event, videos) => {
  videos.forEach((video) => {
    const outputDirectory = video.path.split('.')[0];
    const outputName = video.name.split('.')[0];
    const outputPath = `${outputDirectory}${outputName}.${video.format}`;

    ffmpeg(video.path)
      .output(outputPath)
      .on('progress', ({ timemark }) =>
        mainWindow.webContents.send('conversion:progress', { video, timemark })
      )
      .on('end', () => mainWindow.webContents.send('conversion:end', { video, outputPath }))
      .run();
  });
});

ipcMain.on('folder:open', (event, outputPath) => {
  shell.showItemInFolder(outputPath);
});
