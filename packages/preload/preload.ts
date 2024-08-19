// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

const electronAPI = {
  titleBarDoubleClick: async () => ipcRenderer.send('titleBarDoubleClick'),
  showCollectionMangerCollectionItemMenu: async () =>
    ipcRenderer.send('showCollectionMangerCollectionItemMenu'),
  showSidebarModuleFilesDirectoryItemButtonMenu: async () =>
    ipcRenderer.send('showSidebarModuleFilesDirectoryItemButtonMenu'),
  showSidebarModuleFilesDirectoryItemInputMenu: async () =>
    ipcRenderer.send('showSidebarModuleFilesDirectoryItemInputMenu'),
  showSidebarModuleFilesFileItemButtonMenu: async () =>
    ipcRenderer.send('showSidebarModuleFilesFileItemButtonMenu'),
  showSidebarModuleFilesFileItemInputMenu: async () =>
    ipcRenderer.send('showSidebarModuleFilesFileItemInputMenu'),
  showSidebarModuleFilesFileItemMenu: async () =>
    ipcRenderer.send('showSidebarModuleFilesFileItemMenu'),
  showSidebarModuleFilesMenu: async () => ipcRenderer.send('showSidebarModuleFilesMenu'),
  createNewCollection: async (path: string, name?: string) =>
    await ipcRenderer.invoke('createNewCollection', path, name),
  createNewCollectionSelectPathDialog: async () =>
    await ipcRenderer.invoke('createNewCollectionSelectPathDialog'),
  registerCollectionSelectPathDialog: async () =>
    await ipcRenderer.invoke('registerCollectionSelectPathDialog'),
  getCollectionList: async () => await ipcRenderer.invoke('getCollectionList'),
  checkCollectionPathAvailable: async (path: string, name?: string) =>
    await ipcRenderer.invoke('checkCollectionPathAvailable', path, name),
  getActiveCollectionId: async () => await ipcRenderer.invoke('getActiveCollectionId'),
  setActiveCollectionId: async (id: string) =>
    await ipcRenderer.invoke('setActiveCollectionId', id),
  getCollectionFileTree: async (path: string, name: string) =>
    await ipcRenderer.invoke('getCollectionFileTree', path, name),
  getCollectionInfo: async (id: string) => await ipcRenderer.invoke('getCollectionInfo', id),
  renameItem: async (oldPath: string, name: string, nameNew: string) =>
    await ipcRenderer.invoke('renameItem', oldPath, name, nameNew),
  checkPathAvailable: async (oldPath: string, name: string) =>
    await ipcRenderer.invoke('checkPathAvailable', oldPath, name),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

export default electronAPI;
