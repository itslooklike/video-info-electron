const electron = require('electron');
const { app, Tray } = electron;

class CustomTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;
    this.on('click', this.onClick.bind(this));
    this.setToolTip(app.getName());
  }

  onClick(evt, { x, y }) {
    const { width, height } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.setBounds({ x: x - width / 2 + 8, y, width, height });
      this.mainWindow.show();
    }
  }
}

module.exports = CustomTray;
