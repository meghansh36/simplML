const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const process_handler = require('./cpHandler');
let win;

async function createWindow () {
  
  
  // Create the browser window.
  win = new BrowserWindow({
    width: 1300, 
    height: 1300,
    icon: `file://${__dirname}/../dist/assets/logo.png`,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  
  globalShortcut.register('CommandOrControl+R', () => {
    win.loadURL(`file://${__dirname}/../dist/index.html`)
  });


  globalShortcut.register('F5', () => {
    win.loadURL(`file://${__dirname}/../dist/index.html`)
  });

  win.loadURL(`file://${__dirname}/../dist/index.html`)
  win.maximize()
  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

ipcMain.on('fetch-preview', async (event, filename) => {
  let html = await process_handler.getPreview(filename);
  let previewWindow = new BrowserWindow({
    width: 600,
    height: 400,
    center: true,
  });
  previewWindow.setMenu(null);
  previewWindow.loadURL('data:text/html;charset=UTF-8,' + encodeURIComponent(html));
  previewWindow.on("closed", function() {
    previewWindow = null;
  });
})
