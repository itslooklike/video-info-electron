const path = require('path');
const electron = require('electron');
const { app, BrowserWindow } = electron;

const config = {
  width: 100,
  height: 200,
  frame: false,
  // resizable: false,
  show: false,
  webPreferences: {
    backgroundThrottling: false,
  },
};

class MainWindow extends BrowserWindow {
  constructor() {
    super(config);

    this.loadURL(`file://${path.resolve(__dirname, '..')}/index.html`);
    this.on('blur', () => this.hide());
    this.on('closed', () => app.quit());
  }
}

module.exports = MainWindow;
