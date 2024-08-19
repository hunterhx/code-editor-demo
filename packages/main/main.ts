import { database } from './src/database';
import { dialog } from './src/dialog';
import { file } from './src/file';
import { menu } from './src/menu';
import { window } from './src/window';
import { BrowserWindow, app, ipcMain } from 'electron';

const dbConnection = database.openConnection();
const isMac = process.platform === 'darwin';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  dbConnection.close();
  app.quit();
}

app
  .whenReady()
  .then(() => window.createMainWindow())
  .then(() => window.installReactDevTools())
  .then(() => database.createAllTables(dbConnection))
  .then(async () => await file.initializeAppSettings())
  .then(() => ipcMain.on('titleBarDoubleClick', window.handleTitleBarDoubleClick))
  .then(() =>
    ipcMain.on(
      'showCollectionMangerCollectionItemMenu',
      menu.showCollectionMangerCollectionItemMenu,
    ),
  )
  .then(() =>
    ipcMain.on(
      'showSidebarModuleFilesDirectoryItemButtonMenu',
      menu.showSidebarModuleFilesDirectoryItemButtonMenu,
    ),
  )
  .then(() =>
    ipcMain.on(
      'showSidebarModuleFilesDirectoryItemInputMenu',
      menu.showSidebarModuleFilesDirectoryItemInputMenu,
    ),
  )
  .then(() =>
    ipcMain.on(
      'showSidebarModuleFilesFileItemButtonMenu',
      menu.showSidebarModuleFilesFileItemButtonMenu,
    ),
  )
  .then(() =>
    ipcMain.on(
      'showSidebarModuleFilesFileItemInputMenu',
      menu.showSidebarModuleFilesFileItemInputMenu,
    ),
  )
  .then(() => ipcMain.on('showSidebarModuleFilesMenu', menu.showSidebarModuleFilesMenu))
  .then(() => ipcMain.handle('createNewCollection', file.createNewCollection))
  .then(() =>
    ipcMain.handle(
      'createNewCollectionSelectPathDialog',
      dialog.createNewCollectionSelectPathDialog,
    ),
  )
  .then(() =>
    ipcMain.handle('registerCollectionSelectPathDialog', dialog.registerCollectionSelectPathDialog),
  )
  .then(() => ipcMain.handle('getCollectionList', file.getCollectionList))
  .then(() => ipcMain.handle('checkCollectionPathAvailable', file.checkCollectionPathAvailable))
  .then(() => ipcMain.handle('getActiveCollectionId', file.getActiveCollectionId))
  .then(() => ipcMain.handle('setActiveCollectionId', file.setActiveCollectionId))
  .then(() => ipcMain.handle('getCollectionFileTree', file.getCollectionFileTree))
  .then(() => ipcMain.handle('getCollectionInfo', file.getCollectionInfo))
  .then(() => ipcMain.handle('renameItem', file.renameItem))
  .then(() => ipcMain.handle('checkPathAvailable', file.checkPathAvailable))
  .catch((e) => {
    dbConnection.close();
    console.error('App failed to start:', e);
    // app.quit();
  });

app.on('window-all-closed', () => {
  if (isMac) {
    dbConnection.close();
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    window.createMainWindow();
  }
});
