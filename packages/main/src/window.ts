import { BrowserWindow, app, systemPreferences } from 'electron';
import { REACT_DEVELOPER_TOOLS, installExtension } from 'electron-extension-installer';
import path from 'path';

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

const isDev = !app.isPackaged;
const isMac = process.platform == 'darwin';

export const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: isDev ? 1000 : 800,
    minHeight: isDev ? 10 : 300,
    minWidth: isDev ? 10 : 400,
    titleBarStyle: 'hidden',
    titleBarOverlay: false,
    trafficLightPosition: { x: 12, y: 12 },
    backgroundColor: '#0A0A0A',
    frame: false,
    webPreferences: {
      contextIsolation: true,
      // devTools: isDev ? true : false, // Uncomment to block devTools in prod
      nodeIntegration: false,
      preload: path.join(app.getAppPath(), '.vite/build/preload.js'),
      sandbox: false,
      webviewTag: false,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  if (isDev) mainWindow.webContents.openDevTools();
};

export const installReactDevTools = () => {
  if (isDev) installExtension(REACT_DEVELOPER_TOOLS, { loadExtensionOptions: { allowFileAccess: true } });
};

export const handleTitleBarDoubleClick = () => {
  const window = BrowserWindow.getFocusedWindow();
  if (!window) return;
  if (isMac) {
    const action = systemPreferences.getUserDefault('AppleActionOnDoubleClick', 'string');
    if (action === 'None') return;
    if (action === 'Minimize') return window.minimize();
  }
  if (window.isMaximized()) return window.unmaximize();
  return window.maximize();
};

export * as window from './window';
