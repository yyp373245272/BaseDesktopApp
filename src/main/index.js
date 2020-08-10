import { app, BrowserWindow, ipcMain, dialog } from "electron"

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\")
}

let mainWindow
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    width: 1000,
    frame: false,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on("closed", () => {
    mainWindow = null
  })
  ipcMain.on("close", e => {
    mainWindow.close()
    mainWindow = null
    app.quit()
  })
  ipcMain.on("hide-window", e => {
    mainWindow.minimize()
  })
  ipcMain.on("max-window", e => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore()
    } else {
      mainWindow.maximize()
    }
  })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow()
  }
})
let childDownModal;
  ipcMain.on('child-down-modal', () => {
    childDownModal = new BrowserWindow({
      parent: mainWindow,
      modal: true,
      show: false,
      width: 300,
      height: 300,
      resizable: false,
      backgroundColor: "#fff",
      frame: false,
      hasShadow: true,
      closable: true,
      webPreferences: {
        devTools: false
      }
    })
    childDownModal.once('ready-to-show', () => {
      childDownModal.show();
    })
    childDownModal.loadURL(winURL + '#/downloadModal')
  })
  //关闭模态窗口
  ipcMain.on('close-down-modal', () => {
    childDownModal.hide();
  })

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
