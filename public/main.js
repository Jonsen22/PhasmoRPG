const { app, BrowserWindow, dialog } = require('electron')

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

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

}

let optionsDead = {
  type: 'question',
  buttons: ["Yes", "No",],
  title: 'Dead',
  message: "Are you sure?"
}

ipcMain.handle('close-event', () => {
  app.quit()
})

ipcMain.handle('minimize-event', () => {
  mainWindow.minimize()
})

ipcMain.handle('dead-event', async (event) => { //comunicação entre electron e react, 
  //com a resposta do electron (https://www.electronjs.org/docs/api/ipc-main)
  const choice = await dialog.showMessageBox(optionsDead)
  return choice.response
})

const optionsSave = {
  defaultPath: app.getPath('documents'),
  filters: [
    { name: 'Text Files', extensions: ['txt']}
  ]
}

ipcMain.handle('save-char', async (event, args) => {
  const path = await dialog.showSaveDialog(mainWindow, optionsSave)
  return path
})

console.log(app.getPath('documents'))

const optionsLoad = {
  defaultPath: app.getPath('documents'),
  filters: [
    { name: 'Text Files', extensions: ['txt']}
  ]
}

ipcMain.handle('load-char', async(event, args) => {
  const file = await dialog.showOpenDialog(mainWindow, optionsLoad )
  return file
} )

// app.getAppPath path of the app

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
