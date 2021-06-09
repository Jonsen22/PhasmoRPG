const { app, BrowserWindow } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')
const ipcMain = require('electron').ipcMain;

require('@electron/remote/main').initialize()

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    transparent: true,
    frame: false,
    autoHideMenuBar: true,
    resizable: false,
    width: 604,
    height: 649,
    maximizable: false,
    title: "PhasmoRPG",
    icon: __dirname + "/phasmophobia.png",
    webPreferences: {
      // enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  if(isDev) {
    mainWindow.webContents.openDevTools();
  }

}
ipcMain.handle('close-event', () => {
  app.quit()
})

ipcMain.handle('minimize-event', () => {
  mainWindow.minimize()
})

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
