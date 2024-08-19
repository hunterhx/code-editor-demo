import { BrowserWindow, dialog } from 'electron';

export const createNewCollectionSelectPathDialog = async () => {
  const activeWindow = BrowserWindow.getFocusedWindow();
  if (!activeWindow) return;
  return await dialog.showOpenDialog(activeWindow, {
    title: 'Create Collection',
    defaultPath: '',
    buttonLabel: 'Select',
    filters: [],
    properties: ['openDirectory', 'createDirectory'],
    message: 'Select a folder for your collection',
  });
};

export const registerCollectionSelectPathDialog = async () => {
  const activeWindow = BrowserWindow.getFocusedWindow();
  if (!activeWindow) return;
  return await dialog.showOpenDialog(activeWindow, {
    title: 'Create Collection',
    defaultPath: '',
    buttonLabel: 'Select',
    filters: [],
    properties: ['openDirectory', 'createDirectory'],
    message: 'Select a folder for your collection',
  });
};

export * as dialog from './dialog';
