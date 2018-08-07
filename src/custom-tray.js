const electron = require('electron');
const { app, Tray, Menu } = electron;

const menuConfig = Menu.buildFromTemplate([
  {
    label: 'Quit',
    click: () => app.quit(),
  },
]);

class CustomTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;
    this.setToolTip(app.getName());
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
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

  onRightClick() {
    this.popUpContextMenu(menuConfig);
  }
}

module.exports = CustomTray;
