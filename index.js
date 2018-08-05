const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add New Todo',
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);

  // при закрытии нужно уничтожать ссылку, чтобы избежать утечки памяти
  // в этом примере это не обязательно, тк ссылка перезаписывается при каждом открытии
  addWindow.on('close', () => (addWindow = null));
}

function clearTodosList() {
  mainWindow.webContents.send('clear:todoList');
}

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        accelerator: 'Command+N',
        click() {
          createAddWindow();
        },
      },
      {
        label: 'Clear Todos',
        click() {
          clearTodosList();
        },
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.platform === 'darwin') {
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'View',
    submenu: [
      {
        role: 'reload',
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(menuItem, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('submit:todoValue', (evt, inputValue) => {
  addWindow.close();
  mainWindow.webContents.send('submit:todoValue', inputValue);
});
